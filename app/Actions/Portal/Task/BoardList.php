<?php

namespace App\Actions\Portal\Task;

use App\Models\Task;

class BoardList{
    private array $data = [];
    private ?int $per_page;

    public function __construct(array $data = [], ?int $per_page = null) {
        $this->data = $data;
        $this->per_page = $per_page;
    }

    public function execute(): array {
        $record = Task::with('assigned')->when(strlen($this->data['keyword']) > 0, function ($query) {
            $query->whereRaw("LOWER(name) LIKE '%{$this->data['keyword']}%'");
        })
        ->latest()
        ->paginate(15);

        return ['record' => $record];
    }
}