<?php

namespace Database\Factories;

use App\Models\Task;
use App\Models\User;
use App\Models\Project;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    protected $model = Task::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'project_id' => Project::inRandomOrder()->first()?->id ?? 1,
            'assigned_id' => User::inRandomOrder()->first()?->id ?? 1,
            'name' => $this->faker->sentence(1),
            'status' => $this->faker->randomElement(['pending', 'in_progress', 'completed', 'cancelled']),
            'priority' => $this->faker->randomElement(['normal', 'medium', 'high']),
            'start_date' => $this->faker->dateTimeBetween('-1 week', 'now'),
            'end_date' => $this->faker->dateTimeBetween('now', '+1 week'),
        ];
    }
}
