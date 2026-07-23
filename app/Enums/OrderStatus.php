<?php

namespace App\Enums;

enum OrderStatus: string
{
    case Pending = 'Pendiente';
    case Processing = 'En proceso';
    case Completed = 'Completado';
    case Cancelled = 'Cancelado';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
