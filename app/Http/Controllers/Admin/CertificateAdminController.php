<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCertificateRequest;
use App\Http\Requests\UpdateCertificateRequest;
use App\Models\Certificate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CertificateAdminController extends Controller
{
    public function index(Request $request)
    {
        $filters = $request->only(['search', 'status']);

        $certificates = Certificate::query()
            ->when($filters['search'] ?? null, fn ($q, $v) => $q->where('name', 'like', "%{$v}%"))
            ->when(($filters['status'] ?? null) === 'active', fn ($q) => $q->where('is_active', true))
            ->when(($filters['status'] ?? null) === 'inactive', fn ($q) => $q->where('is_active', false))
            ->ordered()
            ->paginate(15)
            ->withQueryString();

        return inertia('Admin/Certificates/Index', [
            'certificates' => $certificates,
            'filters' => $filters,
        ]);
    }

    public function create()
    {
        return inertia('Admin/Certificates/Form');
    }

    public function store(StoreCertificateRequest $request)
    {
        $data = $request->validated();
        $data['is_active'] = $request->boolean('is_active', true);
        $data['show_on_website'] = $request->boolean('show_on_website', true);

        $data['file_path'] = $request->file('file')->store('certificates', 'public');

        $maxOrder = Certificate::max('sort_order');
        $data['sort_order'] = $data['sort_order'] ?? ($maxOrder === null ? 0 : $maxOrder + 1);

        Certificate::create($data);

        return redirect()->route('admin.certificates.index')->with('success', 'Certificate created.');
    }

    public function edit(Certificate $certificate)
    {
        return inertia('Admin/Certificates/Form', ['certificate' => $certificate]);
    }

    public function update(UpdateCertificateRequest $request, Certificate $certificate)
    {
        $data = $request->validated();
        $data['is_active'] = $request->boolean('is_active', true);
        $data['show_on_website'] = $request->boolean('show_on_website', true);

        if ($request->hasFile('file')) {
            Storage::disk('public')->delete($certificate->file_path);
            $data['file_path'] = $request->file('file')->store('certificates', 'public');
        }

        $certificate->update($data);

        return redirect()->route('admin.certificates.index')->with('success', 'Certificate updated.');
    }

    public function destroy(Certificate $certificate)
    {
        Storage::disk('public')->delete($certificate->file_path);
        $certificate->delete();

        return back()->with('success', 'Certificate deleted.');
    }
}
