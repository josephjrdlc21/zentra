<?php

namespace App\Actions\Portal\Role;

use App\Models\UserRole;

class RoleList{
    private array $data = [];
    private ?int $per_page;

    public function __construct(array $data = [], ?int $per_page = null) {
        $this->data = $data;
        $this->per_page = $per_page;
    }

    public function execute(): array {
        $record = UserRole::withCount('permissions')->when(strlen($this->data['keyword']) > 0, function ($query) {
            $query->whereRaw("LOWER(name) LIKE '%{$this->data['keyword']}%'");
        })
        ->latest()
        ->paginate($this->per_page);

        return ['record' => $record];
    }
}