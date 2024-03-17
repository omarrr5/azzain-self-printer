<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Storage;


class FileUploadController extends Controller
{
    public function upload(Request $request)
    {
        if ($request->hasFile('files')) {
            $uploadedFiles = [];
            $counter = 1; // 
            foreach ($request->file('files') as $file) {
                $customFileName = 'Azzain_Document_' . $counter++ . '.' . $file->getClientOriginalExtension();
                $path = $file->storeAs('uploads', $customFileName);
                $uploadedFiles[] = [
                    'name' => $customFileName,
                    'path' => $path
                ];
            }
            return response()->json(['message' => 'Files uploaded successfully', 'files' => $uploadedFiles], 200);
        } else {
            return response()->json(['error' => 'No files were uploaded'], 400);
        }
    }
    

    public function getUploadedDocuments()
    {
        $files = Storage::files('uploads');

        $uploadedDocuments = [];
        foreach ($files as $file) {
            $fileName = basename($file);
            $uploadedDocuments[] = [
                'name' => $fileName,
                'path' => Storage::url($file), 
            ];
        }

        return response()->json(['documents' => $uploadedDocuments]);
    }
    
}
