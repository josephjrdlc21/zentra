<?php

namespace App\Http\Controllers\Portal;

use App\Actions\Portal\Report\ReportList;
use App\Actions\Portal\Report\ReportExport;

use App\Exports\ReportsExport;

use App\Http\Requests\PageRequest;

use Maatwebsite\Excel\Facades\Excel;
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

        $action = new ReportList($this->data, $this->per_page);
        $result = $action->execute();

        $this->data['record'] = $result['record'];

        return inertia('portal/reports/index', ['values' => $this->data]);
    }

    public function export_report(PageRequest $request) {
        $this->data['keyword'] = Str::lower($request->get('keyword'));

        $action = new ReportExport($this->data);
        $result = $action->execute();

        return Excel::download(
            new ReportsExport($result['record']), 'Task_Report_' . Carbon::now()->format('Y-m-d') . '.xlsx'
        );
    }
}