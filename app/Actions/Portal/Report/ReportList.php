<?php

namespace App\Actions\Portal\Report;

use App\Models\Task;

class ReportList{
    private array $data = [];
    private ?int $per_page;

    public function __construct(array $data = [], ?int $per_page = null) {
        $this->data = $data;
        $this->per_page = $per_page;
    }

    public function execute(): array {
        $record = Task::with(['assigned', 'project'])->when(strlen($this->data['keyword']) > 0, function ($query) {
            $query->whereRaw("LOWER(name) LIKE '%{$this->data['keyword']}%'")
                ->orWhereHas('project', function ($q) {
                    $q->whereRaw("LOWER(name) LIKE '%{$this->data['keyword']}%'");
                });
        })
        ->latest()
        ->paginate($this->per_page);

        return ['record' => $record];
    }
}