<?php

namespace App\Actions\Portal\User;

use App\Models\User;

use Carbon\Carbon;

class UserList{
    private array $data = [];
    private ?int $per_page;

    public function __construct(array $data = [], ?int $per_page = null) {
        $this->data = $data;
        $this->per_page = $per_page;
    }

    public function execute(): array {
        $record = User::when(strlen($this->data['keyword']) > 0, function ($query) {
            $query->whereRaw("LOWER(name) LIKE '%{$this->data['keyword']}%'")
                ->orWhereRaw("LOWER(email) LIKE '%{$this->data['keyword']}%'");
        })
        ->when(strlen($this->data['selected_status']) > 0, function ($query) {
            $query->where('status', $this->data['selected_status']);
        })
        ->when(strlen($this->data['start_date']) > 0, function ($query) {
            $query->whereDate('created_at', '>=', Carbon::parse($this->data['start_date'])->format("Y-m-d"));
        })
        ->when(strlen($this->data['end_date']) > 0, function ($query) {
            $query->whereDate('created_at', '<=', Carbon::parse($this->data['end_date'])->format("Y-m-d"));
        })
        ->latest()
        ->where('id', '!=', '1')
        ->paginate($this->per_page);

        return ['record' => $record];
    }
}