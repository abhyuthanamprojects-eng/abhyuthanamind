<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreServiceRequest;
use App\Http\Requests\UpdateServiceRequest;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ServiceAdminController extends Controller
{
    public function index(Request $request)
    {
        $filters = $request->only(['search', 'status']);

        $services = Service::query()
            ->when($filters['search'] ?? null, fn ($q, $v) => $q->where('title', 'like', "%{$v}%"))
            ->when(($filters['status'] ?? null) === 'active', fn ($q) => $q->where('is_active', true))
            ->when(($filters['status'] ?? null) === 'inactive', fn ($q) => $q->where('is_active', false))
            ->ordered()
            ->paginate(15)
            ->withQueryString();

        return inertia('Admin/Services/Index', [
            'services' => $services,
            'filters' => $filters,
        ]);
    }

    public function create()
    {
        return inertia('Admin/Services/Form');
    }

    public function store(StoreServiceRequest $request)
    {
        $data = $request->validated();
        $data['is_active'] = $request->boolean('is_active', true);
        $data['slug'] = $data['slug'] ?? Str::slug($data['title']);

        if ($request->hasFile('image')) {
            $data['image_path'] = $request->file('image')->store('services', 'public');
        }

        $maxOrder = Service::max('sort_order');
        $data['sort_order'] = $data['sort_order'] ?? ($maxOrder === null ? 0 : $maxOrder + 1);

        Service::create($data);

        return redirect()->route('admin.services.index')->with('success', 'Service created.');
    }

    public function edit(Service $service)
    {
        return inertia('Admin/Services/Form', ['service' => $service]);
    }

    public function update(UpdateServiceRequest $request, Service $service)
    {
        $data = $request->validated();
        $data['is_active'] = $request->boolean('is_active', true);
        $data['slug'] = $data['slug'] ?? Str::slug($data['title']);

        if ($request->hasFile('image')) {
            if ($service->image_path) {
                Storage::disk('public')->delete($service->image_path);
            }
            $data['image_path'] = $request->file('image')->store('services', 'public');
        }

        $service->update($data);

        return redirect()->route('admin.services.index')->with('success', 'Service updated.');
    }

    public function destroy(Service $service)
    {
        if ($service->image_path) {
            Storage::disk('public')->delete($service->image_path);
        }
        $service->delete();

        return back()->with('success', 'Service deleted.');
    }
}
