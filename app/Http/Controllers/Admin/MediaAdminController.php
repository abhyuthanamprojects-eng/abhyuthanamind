<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMediaItemRequest;
use App\Http\Requests\UpdateMediaItemRequest;
use App\Models\MediaItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MediaAdminController extends Controller
{
    public function index(Request $request)
    {
        $filters = $request->only(['search', 'category']);

        $items = MediaItem::query()
            ->when($filters['search'] ?? null, fn ($q, $v) => $q->where('title', 'like', "%{$v}%"))
            ->when($filters['category'] ?? null, fn ($q, $v) => $q->where('category', $v))
            ->ordered()
            ->paginate(24)
            ->withQueryString();

        return inertia('Admin/Media/Index', [
            'items' => $items,
            'filters' => $filters,
            'categories' => MediaItem::query()->whereNotNull('category')->distinct()->pluck('category'),
        ]);
    }

    public function store(StoreMediaItemRequest $request)
    {
        $data = $request->validated();
        $data['is_active'] = $request->boolean('is_active', true);
        $data['file_path'] = $request->file('file')->store('gallery', 'public');

        $maxOrder = MediaItem::max('sort_order');
        $data['sort_order'] = $data['sort_order'] ?? ($maxOrder === null ? 0 : $maxOrder + 1);

        MediaItem::create($data);

        return back()->with('success', 'Media item uploaded.');
    }

    public function update(UpdateMediaItemRequest $request, MediaItem $mediaItem)
    {
        $data = $request->validated();
        $data['is_active'] = $request->boolean('is_active', true);

        if ($request->hasFile('file')) {
            Storage::disk('public')->delete($mediaItem->file_path);
            $data['file_path'] = $request->file('file')->store('gallery', 'public');
        }

        $mediaItem->update($data);

        return back()->with('success', 'Media item updated.');
    }

    public function destroy(MediaItem $mediaItem)
    {
        Storage::disk('public')->delete($mediaItem->file_path);
        $mediaItem->delete();

        return back()->with('success', 'Media item deleted.');
    }
}
