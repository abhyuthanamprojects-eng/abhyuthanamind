<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreScrapItemRequest;
use App\Http\Requests\UpdateScrapItemRequest;
use App\Models\ScrapCategory;
use App\Models\ScrapItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ScrapItemController extends Controller
{
    public function index(Request $request)
    {
        $filters = $request->only(['search', 'category', 'status']);

        $items = ScrapItem::with('category')
            ->when($filters['search'] ?? null, fn ($q, $v) => $q->where('name', 'like', "%{$v}%"))
            ->when($filters['category'] ?? null, fn ($q, $v) => $q->where('scrap_category_id', $v))
            ->when(($filters['status'] ?? null) === 'active', fn ($q) => $q->where('is_active', true))
            ->when(($filters['status'] ?? null) === 'inactive', fn ($q) => $q->where('is_active', false))
            ->ordered()
            ->paginate(15)
            ->withQueryString();

        return inertia('Admin/ScrapRate/Index', [
            'items' => $items,
            'categories' => ScrapCategory::ordered()->get(),
            'filters' => $filters,
            'stats' => [
                'total_items' => ScrapItem::count(),
                'active_items' => ScrapItem::active()->count(),
                'total_categories' => ScrapCategory::count(),
            ],
        ]);
    }

    public function create()
    {
        return inertia('Admin/ScrapRate/Form', [
            'categories' => ScrapCategory::ordered()->get(),
        ]);
    }

    public function store(StoreScrapItemRequest $request)
    {
        $data = $request->validated();
        $data['is_active'] = $request->boolean('is_active', true);

        if ($request->hasFile('image')) {
            $data['image_path'] = $request->file('image')->store('scrap-items', 'public');
        }

        $maxOrder = ScrapItem::max('sort_order');
        $data['sort_order'] = $data['sort_order'] ?? ($maxOrder === null ? 0 : $maxOrder + 1);

        ScrapItem::create($data);

        return redirect()->route('admin.scrap-rate.index')->with('success', 'Scrap item created.');
    }

    public function edit(ScrapItem $scrapItem)
    {
        return inertia('Admin/ScrapRate/Form', [
            'item' => $scrapItem,
            'categories' => ScrapCategory::ordered()->get(),
        ]);
    }

    public function update(UpdateScrapItemRequest $request, ScrapItem $scrapItem)
    {
        $data = $request->validated();
        $data['is_active'] = $request->boolean('is_active', true);

        if ($request->hasFile('image')) {
            if ($scrapItem->image_path) {
                Storage::disk('public')->delete($scrapItem->image_path);
            }
            $data['image_path'] = $request->file('image')->store('scrap-items', 'public');
        }

        $scrapItem->update($data);

        return redirect()->route('admin.scrap-rate.index')->with('success', 'Scrap item updated.');
    }

    public function destroy(ScrapItem $scrapItem)
    {
        if ($scrapItem->image_path) {
            Storage::disk('public')->delete($scrapItem->image_path);
        }
        $scrapItem->delete();

        return back()->with('success', 'Scrap item deleted.');
    }

    public function toggleStatus(ScrapItem $scrapItem)
    {
        $scrapItem->update(['is_active' => !$scrapItem->is_active]);

        return back()->with('success', 'Scrap item status updated.');
    }
}
