<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreIndustryRequest;
use App\Http\Requests\UpdateIndustryRequest;
use App\Models\Industry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class IndustryAdminController extends Controller
{
    public function index(Request $request)
    {
        $filters = $request->only(['search', 'status']);

        $industries = Industry::query()
            ->when($filters['search'] ?? null, fn ($q, $v) => $q->where('title', 'like', "%{$v}%"))
            ->when(($filters['status'] ?? null) === 'active', fn ($q) => $q->where('is_active', true))
            ->when(($filters['status'] ?? null) === 'inactive', fn ($q) => $q->where('is_active', false))
            ->ordered()
            ->paginate(15)
            ->withQueryString();

        return inertia('Admin/Industries/Index', [
            'industries' => $industries,
            'filters' => $filters,
        ]);
    }

    public function create()
    {
        return inertia('Admin/Industries/Form');
    }

    public function store(StoreIndustryRequest $request)
    {
        $data = $request->validated();
        $data['is_active'] = $request->boolean('is_active', true);
        $data['slug'] = $data['slug'] ?? Str::slug($data['title']);

        if ($request->hasFile('image')) {
            $data['image_path'] = $request->file('image')->store('industries', 'public');
        }

        $maxOrder = Industry::max('sort_order');
        $data['sort_order'] = $data['sort_order'] ?? ($maxOrder === null ? 0 : $maxOrder + 1);

        Industry::create($data);

        return redirect()->route('admin.industries.index')->with('success', 'Industry created.');
    }

    public function edit(Industry $industry)
    {
        return inertia('Admin/Industries/Form', ['industry' => $industry]);
    }

    public function update(UpdateIndustryRequest $request, Industry $industry)
    {
        $data = $request->validated();
        $data['is_active'] = $request->boolean('is_active', true);
        $data['slug'] = $data['slug'] ?? Str::slug($data['title']);

        if ($request->hasFile('image')) {
            if ($industry->image_path) {
                Storage::disk('public')->delete($industry->image_path);
            }
            $data['image_path'] = $request->file('image')->store('industries', 'public');
        }

        $industry->update($data);

        return redirect()->route('admin.industries.index')->with('success', 'Industry updated.');
    }

    public function destroy(Industry $industry)
    {
        if ($industry->image_path) {
            Storage::disk('public')->delete($industry->image_path);
        }
        $industry->delete();

        return back()->with('success', 'Industry deleted.');
    }
}
