<?php

namespace App\Http\Controllers\Portal;

use App\Http\Controllers\Controller as BaseController;

class Controller extends BaseController{
    protected array $data = [];

    public function __construct(){
        
    }

    public function get_data(): array {
        $this->data['page_title'] = "";
        
		return $this->data;
	}
}