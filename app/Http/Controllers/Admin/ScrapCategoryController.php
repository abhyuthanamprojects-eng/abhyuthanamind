<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreScrapCategoryRequest;
use App\Http\Requests\UpdateScrapCategoryRequest;
use App\Models\ScrapCategory;

class ScrapCategoryController extends Controller
{
    public function store(StoreScrapCategoryRequest $request)
    {
        $data = $request->validated();
        $maxOrder = ScrapCategory::max('sort_order');
        $data['sort_order'] = $data['sort_order'] ?? ($maxOrder === null ? 0 : $maxOrder + 1);
        $data['is_active'] = $request->boolean('is_active', true);

        ScrapCategory::create($data);

        return back()->with('success', 'Scrap category created.');
    }

    public function update(UpdateScrapCategoryRequest $request, ScrapCategory $scrapCategory)
    {
        $data = $request->validated();
        $data['is_active'] = $request->boolean('is_active', true);

        $scrapCategory->update($data);

        return back()->with('success', 'Scrap category updated.');
    }

    public function destroy(ScrapCategory $scrapCategory)
    {
        if ($scrapCategory->items()->exists()) {
            return back()->with('error', 'Cannot delete a category that still has scrap items. Move or delete its items first.');
        }

        $scrapCategory->delete();

        return back()->with('success', 'Scrap category deleted.');
    }
}
