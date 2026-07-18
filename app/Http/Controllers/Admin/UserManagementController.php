<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserManagementController extends Controller
{
    public function index()
    {
        $users = User::paginate(20);
        $userTypes = ['admin', 'manager', 'accountant', 'customer'];

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'userTypes' => $userTypes,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Users/Create', [
            'userTypes' => ['admin', 'manager', 'accountant', 'customer'],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'user_type' => 'required|in:admin,manager,accountant,customer',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'user_type' => $validated['user_type'],
            'status' => true,
        ]);

        return redirect(route('admin.users.index'))->with('success', 'User created successfully');
    }

    public function edit(User $user)
    {
        return Inertia::render('Admin/Users/Edit', [
            'user' => $user,
            'userTypes' => ['admin', 'manager', 'accountant', 'customer'],
        ]);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'user_type' => 'required|in:admin,manager,accountant,customer',
            'status' => 'required|boolean',
            'password' => 'nullable|string|min:8',
        ]);

        $user->name = $validated['name'];
        $user->email = $validated['email'];
        $user->user_type = $validated['user_type'];
        $user->status = $validated['status'];

        if ($validated['password']) {
            $user->password = Hash::make($validated['password']);
        }

        $user->save();

        return redirect(route('admin.users.index'))->with('success', 'User updated successfully');
    }

    public function destroy(User $user)
    {
        if ($user->id === auth()->id()) {
            return back()->with('error', 'Cannot delete your own account');
        }

        $user->delete();

        return redirect(route('admin.users.index'))->with('success', 'User deleted successfully');
    }
}
