<?php

namespace App\Events;

use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class AuditTrailLogged 
{
    use Dispatchable, SerializesModels;

    public $process;
    public $remarks;
    public $type;

    public function __construct($process, $remarks, $type)
    {
        $this->process = $process;
        $this->remarks = $remarks;
        $this->type = $type;
    }
}