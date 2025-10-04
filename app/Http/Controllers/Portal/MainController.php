<?php

namespace App\Http\Controllers\Portal;

use App\Http\Requests\PageRequest;

use Inertia\Response;

class MainController extends Controller{
    protected array $data = [];

    public function __construct(){
        parent::__construct();
        array_merge($this->data?:[], parent::get_data());
        $this->data['page_title'] .= "Main";
    }

    public function index(PageRequest $request): Response {
        $this->data['page_title'] .= " - Dashboard";

        return inertia('portal/index', ['values' => $this->data]);
    }
}