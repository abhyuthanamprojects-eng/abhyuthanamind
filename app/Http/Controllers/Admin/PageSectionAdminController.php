<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePageSectionRequest;
use App\Http\Requests\UpdatePageSectionRequest;
use App\Models\PageSection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PageSectionAdminController extends Controller
{
    public function index(Request $request)
    {
        $filters = $request->only(['page_key']);

        $sections = PageSection::query()
            ->when($filters['page_key'] ?? null, fn ($q, $v) => $q->where('page_key', $v))
            ->ordered()
            ->paginate(20)
            ->withQueryString();

        return inertia('Admin/PageSections/Index', [
            'sections' => $sections,
            'filters' => $filters,
            'pageKeys' => PageSection::query()->distinct()->pluck('page_key'),
        ]);
    }

    public function create()
    {
        return inertia('Admin/PageSections/Form');
    }

    public function store(StorePageSectionRequest $request)
    {
        $data = $request->validated();
        $data['is_active'] = $request->boolean('is_active', true);

        if ($request->filled('json_data')) {
            $data['json_data'] = json_decode($request->input('json_data'), true);
        }

        if ($request->hasFile('image')) {
            $data['image_path'] = $request->file('image')->store('pages', 'public');
        }

        $maxOrder = PageSection::max('sort_order');
        $data['sort_order'] = $data['sort_order'] ?? ($maxOrder === null ? 0 : $maxOrder + 1);

        PageSection::create($data);

        return redirect()->route('admin.page-sections.index')->with('success', 'Page section created.');
    }

    public function edit(PageSection $pageSection)
    {
        return inertia('Admin/PageSections/Form', ['section' => $pageSection]);
    }

    public function update(UpdatePageSectionRequest $request, PageSection $pageSection)
    {
        $data = $request->validated();
        $data['is_active'] = $request->boolean('is_active', true);

        if ($request->filled('json_data')) {
            $data['json_data'] = json_decode($request->input('json_data'), true);
        }

        if ($request->hasFile('image')) {
            if ($pageSection->image_path) {
                Storage::disk('public')->delete($pageSection->image_path);
            }
            $data['image_path'] = $request->file('image')->store('pages', 'public');
        }

        $pageSection->update($data);

        return redirect()->route('admin.page-sections.index')->with('success', 'Page section updated.');
    }

    public function destroy(PageSection $pageSection)
    {
        if ($pageSection->image_path) {
            Storage::disk('public')->delete($pageSection->image_path);
        }
        $pageSection->delete();

        return back()->with('success', 'Page section deleted.');
    }
}
