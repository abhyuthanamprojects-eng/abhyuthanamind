<?php

namespace App\Traits;

use Illuminate\Support\Facades\Storage;

trait ResolvesPublicFileUrl
{
    /**
     * Seeded assets are copied directly under public/ (e.g. public/services),
     * while admin uploads land on the public storage disk and are served via
     * the /storage symlink. Resolve whichever location actually has the file.
     */
    protected function resolvePublicFileUrl(?string $path): ?string
    {
        if (!$path) {
            return null;
        }

        if (file_exists(public_path($path))) {
            return asset($path);
        }

        return Storage::disk('public')->url($path);
    }
}
