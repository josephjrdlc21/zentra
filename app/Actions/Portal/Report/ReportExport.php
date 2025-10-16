<?php

namespace App\Actions\Portal\Report;

use App\Models\Task;

class ReportExport{
    private array $data = [];

    public function __construct(array $data = [],) {
        $this->data = $data;
    }

    public function execute(): array {
        $record = Task::with(['assigned', 'project'])->when(strlen($this->data['keyword']) > 0, function ($query) {
            $query->whereRaw("LOWER(name) LIKE '%{$this->data['keyword']}%'")
                ->orWhereHas('project', function ($q) {
                    $q->whereRaw("LOWER(name) LIKE '%{$this->data['keyword']}%'");
                });
        })
        ->latest()
        ->get();

        return ['record' => $record];
    }
}