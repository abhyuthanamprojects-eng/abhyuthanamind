<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;
use Symfony\Component\Process\Process;

class MediaCompressionService
{
    /**
     * Store an uploaded image or video file, compressing it first.
     * Returns the relative path (from the public disk root) of the stored file.
     */
    public static function store(UploadedFile $file, string $directory): string
    {
        $mime = (string) $file->getMimeType();

        if (str_starts_with($mime, 'video/')) {
            return self::storeCompressedVideo($file, $directory);
        }

        return self::storeCompressedImage($file, $directory);
    }

    public static function isVideo(UploadedFile $file): bool
    {
        return str_starts_with((string) $file->getMimeType(), 'video/');
    }

    private static function ensureDir(string $directory): void
    {
        $full = public_path($directory);
        if (!is_dir($full)) {
            mkdir($full, 0755, true);
        }
    }

    private static function storeCompressedImage(UploadedFile $file, string $directory, int $maxWidth = 1280, int $quality = 75): string
    {
        self::ensureDir($directory);

        $relativePath = $directory . '/' . Str::random(24) . '.jpg';
        $fullPath = public_path($relativePath);

        $imageInfo = @getimagesize($file->getRealPath());

        if (!$imageInfo) {
            // Not a readable raster image (e.g. unsupported format) — store as-is.
            return $file->store($directory, 'public');
        }

        [$width, $height, $type] = $imageInfo;

        $source = match ($type) {
            IMAGETYPE_JPEG => @imagecreatefromjpeg($file->getRealPath()),
            IMAGETYPE_PNG => @imagecreatefrompng($file->getRealPath()),
            IMAGETYPE_WEBP => function_exists('imagecreatefromwebp') ? @imagecreatefromwebp($file->getRealPath()) : null,
            IMAGETYPE_GIF => @imagecreatefromgif($file->getRealPath()),
            default => null,
        };

        if (!$source) {
            return $file->store($directory, 'public');
        }

        // Flatten transparency onto white before encoding to JPEG.
        $canvasWidth = $width;
        $canvasHeight = $height;

        if ($width > $maxWidth) {
            $canvasWidth = $maxWidth;
            $canvasHeight = (int) round($height * ($maxWidth / $width));
        }

        $canvas = imagecreatetruecolor($canvasWidth, $canvasHeight);
        $white = imagecolorallocate($canvas, 255, 255, 255);
        imagefill($canvas, 0, 0, $white);
        imagecopyresampled($canvas, $source, 0, 0, 0, 0, $canvasWidth, $canvasHeight, $width, $height);
        imagedestroy($source);

        imagejpeg($canvas, $fullPath, $quality);
        imagedestroy($canvas);

        return $relativePath;
    }

    private static function storeCompressedVideo(UploadedFile $file, string $directory): string
    {
        self::ensureDir($directory);

        $relativePath = $directory . '/' . Str::random(24) . '.mp4';
        $fullPath = public_path($relativePath);

        $process = new Process([
            'ffmpeg', '-y',
            '-i', $file->getRealPath(),
            '-vf', 'scale=\'min(1280,iw)\':-2',
            '-c:v', 'libx264', '-crf', '28', '-preset', 'veryfast',
            '-c:a', 'aac', '-b:a', '128k',
            '-movflags', '+faststart',
            $fullPath,
        ]);
        $process->setTimeout(300);

        try {
            $process->run();
        } catch (\Throwable $e) {
            $process = null;
        }

        if (!$process || !$process->isSuccessful() || !file_exists($fullPath)) {
            // ffmpeg unavailable or failed — fall back to storing the original upload.
            return $file->store($directory, 'public');
        }

        return $relativePath;
    }
}
