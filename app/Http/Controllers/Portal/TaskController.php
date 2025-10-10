<?php

namespace App\Http\Controllers\Portal;

use App\Http\Requests\PageRequest;
//use App\Http\Requests\Portal\TaskRequest;

use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;

use Inertia\Response;
use Carbon\Carbon;

class TaskController extends Controller{
    protected array $data = [];
    protected array $request = [];
    protected ?int $per_page;

    public function __construct(){
        parent::__construct();
        array_merge($this->data?:[], parent::get_data());
        $this->data['page_title'] .= "Task";
        $this->per_page = env("DEFAULT_PER_PAGE", 10);
    }

    public function index(PageRequest $request): Response {
        $this->data['page_title'] .= " - List";

        return inertia('portal/tasks/index', ['values' => $this->data]);
    }

    public function board(PageRequest $request): Response {
        $this->data['page_title'] .= " - List";

        return inertia('portal/tasks/board', ['values' => $this->data]);
    }
}