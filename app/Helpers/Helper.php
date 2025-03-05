<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Storage;

class Helper
{

    // public static function getMainSetting()
    // {
    //     return Cache::get('main_setting', function (){
    //         return Setting::latest()->first();
    //     });
    // }



    public static function isUrl($link)
    {
        return filter_var($link, FILTER_VALIDATE_URL);
    }


}
if (!function_exists('deleteFile')) {
    function deleteFile(string $filePath): void
    {
        if (Storage::disk('public')->exists($filePath)) {
            Storage::disk('public')->delete($filePath);
        }
    }
}
