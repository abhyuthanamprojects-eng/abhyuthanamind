<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\City;
use App\Services\ServiceabilityService;
use App\Traits\ApiResponseTrait;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;

class ServiceCoverageController extends Controller
{
    use ApiResponseTrait;

    #[OA\Get(
        path: "/api/v1/service-coverage",
        operationId: "getServiceCoverage",
        tags: ["Location"],
        summary: "List active cities and configured serviceable pincodes",
        responses: [
            new OA\Response(response: 200, description: "Success")
        ]
    )]
    public function index()
    {
        $cities = City::where('status', true)
            ->with('state')
            ->get()
            ->map(fn (City $city) => [
                'city_id' => $city->id,
                'city_name' => $city->name,
                'state_name' => $city->state->name ?? null,
            ]);

        return $this->successResponse('location.coverage_fetched', [
            'cities' => $cities,
            'serviceable_pincodes' => ServiceabilityService::serviceablePincodes(),
        ]);
    }
}
