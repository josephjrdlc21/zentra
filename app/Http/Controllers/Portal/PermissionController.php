<?php

namespace App\Http\Controllers\Portal;

use App\Actions\Portal\Permission\PermissionList;

use App\Http\Requests\PageRequest;

use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;

use Inertia\Response;
use Carbon\Carbon;

class PermissionController extends Controller{
    protected array $data = [];
    protected array $request = [];
    protected ?int $per_page;

    public function __construct(){
        parent::__construct();
        array_merge($this->data?:[], parent::get_data());
        $this->data['page_title'] .= "Permission";
        $this->per_page = env("DEFAULT_PER_PAGE", 10);
    }

    public function index(PageRequest $request): Response {
        $this->data['page_title'] .= " - List";
        $this->data['keyword'] = Str::lower($request->get('keyword'));

        $action = new PermissionList($this->data, $this->per_page);
        $result = $action->execute();

        $this->data['record'] = $result['record'];

        return inertia('portal/permissions/index', ['values' => $this->data]);
    }
}