<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\RoleMenuPermission;
use App\Traits\ApiResponseTrait;
use Illuminate\Http\Request;

class RolePermissionController extends Controller
{
    use ApiResponseTrait;

    public function getByRole(string $roleName)
    {
        $permissions = RoleMenuPermission::where('role_name', $roleName)->get();
        return $this->successResponse('role_permissions_retrieved', $permissions->toArray());
    }

    public function updatePermissions(Request $request, string $roleName)
    {
        $request->validate([
            'permissions' => 'required|array',
            'permissions.*.menu_key' => 'required|string',
            'permissions.*.can_access' => 'required|boolean',
            'permissions.*.can_edit' => 'required|boolean',
        ]);

        foreach ($request->permissions as $perm) {
            RoleMenuPermission::updateOrCreate(
                ['role_name' => $roleName, 'menu_key' => $perm['menu_key']],
                ['can_access' => $perm['can_access'], 'can_edit' => $perm['can_edit']]
            );
        }

        return $this->successResponse('role_permissions_updated', [
            'role_name' => $roleName,
            'permissions' => $request->permissions
        ]);
    }

    public function getAvailableMenus(Request $request)
    {
        $user = $request->user();
        $userType = $user->user_type ?? 'customer';

        $permissions = RoleMenuPermission::where('role_name', $userType)
            ->where('can_access', true)
            ->get()
            ->pluck('menu_key')
            ->toArray();

        return $this->successResponse('available_menus_retrieved', [
            'user_type' => $userType,
            'accessible_menus' => $permissions
        ]);
    }

    public function getAllRoles()
    {
        $roles = ['admin', 'manager', 'accountant'];
        return $this->successResponse('roles_retrieved', ['roles' => $roles]);
    }
}
