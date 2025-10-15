<?php

namespace App\Http\Controllers\Portal;

//use App\Actions\Portal\Task\ReportList;

use App\Http\Requests\PageRequest;

use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;

use Inertia\Response;
use Inertia\Inertia;
use Carbon\Carbon;

class ReportController extends Controller{
    protected array $data = [];
    protected array $request = [];
    protected ?int $per_page;

    public function __construct(){
        parent::__construct();
        array_merge($this->data?:[], parent::get_data());
        $this->data['page_title'] .= "Reports";
        $this->per_page = env("DEFAULT_PER_PAGE", 10);
    }

    public function index(PageRequest $request): Response {
        $this->data['page_title'] .= " - List";
        $this->data['keyword'] = Str::lower($request->get('keyword'));

        // $action = new TaskList($this->data, $this->per_page);
        // $result = $action->execute();

        // $this->data['record'] = $result['record'];

        return inertia('portal/reports/index', ['values' => $this->data]);
    }
}