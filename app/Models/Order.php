<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Enums\OrderStatus;

class Order extends Model
{
    protected $fillable = [
        'client_id',
        'order_date',
        'status',
        'total',
    ];

    protected $casts = [
        'order_date' => 'date',
        'total' => 'decimal:2',
        'status' => OrderStatus::class,
    ];

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    public function details(): HasMany
    {
        return $this->hasMany(OrderDetail::class);
    }

    public function calculateTotal(): void
    {
        $this->total = $this->details()->sum('subtotal');

        $this->save();
    }
}
