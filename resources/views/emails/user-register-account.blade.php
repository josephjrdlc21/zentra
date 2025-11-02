<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{ env('APP_NAME') }}</title>
    <style>
        body{
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;  
            font-size: 14px; -webkit-font-smoothing: antialiased; -webkit-text-size-			
            adjust: none; 
            width: 100% !important; 
            height: 100%; 
            line-height: 1.6em; 
            margin: 0;
            padding: 10px;
            overflow-x: hidden;
        }
        th {
            font-weight: bold;
            padding: 20px 20px 0 20px;
            text-transform: uppercase;
        }
        table,
        td {
            border-collapse: collapse;
            padding: 20px 20px 0 20px;
        }
        table {
            margin-left: auto;
            margin-right: auto;
        }
        .table-wrapper {
            border: 1px solid #F0F0F0;
            border-radius: 8px;
            overflow: hidden; /* clip corners */
            max-width: 600px;
            margin: 0 auto;
        }
        tfoot {
            display: flex;
            justify-content: center;
            align-items: center; 
            background-color: #233d8d;
            color: white;
            border-radius: 0;
            padding: 5px;
        }
        .btn,
        .btn:hover,
        .btn:focus,
        .btn:active
        {   
            text-decoration: none !important;
            transition: none !important;
            animation: none !important;
            transform: none !important;
            box-shadow: none !important;
            top: auto !important;
            left: auto !important;
            right: auto !important;
            bottom: auto !important;
            border: none !important;
            padding: 8px 16px;
            border-radius: 4px;
        }

        .btn-primary {
            color: #fff !important;
            background-color: #233d8d !important;
        }

        .btn-primary:hover {
            color: #fff !important;
            background-color: #1f367e !important;
        }
        
        .btn-success {
            display: inline-block;
            font-weight: 400;
            text-align: center;
            white-space: nowrap;
            vertical-align: middle;
            user-select: none;
            border: 1px solid transparent;
            padding: 0.375rem 0.75rem;
            line-height: 1.5;
            border-radius: 0.25rem;
            color: #fff;
            background-color: #218838;
            border-color: #28a745;
            text-decoration: none;
            transition: background-color 0.15s ease-in-out, 
                        border-color 0.15s ease-in-out, 
                        box-shadow 0.15s ease-in-out;
        }

        .btn-success:hover {
            background-color: #28a745;
            border-color: #1e7e34;
            color: #fff;
            text-decoration: none;
        }

        .btn-success:focus {
            outline: 0;
            box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.5);
        }

        .btn-success:active {
            background-color: #1e7e34;
            border-color: #1c7430;
        }
        
        .text-center {
            text-align: center !important;
        }
        
        .text-success {
            color: #218838 !important;
        }
        
        .text-white {
            color: white !important;
        }
        
        .text-bold {
            font-weight: bold !important;
        }
        
        .bg-success{
        background: #c96442;
        }
        
        .bg-secondary{
        background: #f2f2f2;
        }
        
        .text-gray{
        color: #999999;
        }
        
    </style>
</head>

<body>
    <div class="table-wrapper">
        <table>
            <tr class="bg-success">
                <td class="text-center text-bold text-white" style="padding-bottom: 20px;">
                    {{ env('APP_NAME') }}
                <td>
            </tr>

            <tr>
                <td>
                    Account Verification 
                </td>
            </tr>

            <tr>
                <td>
                    <b>Hi There, {{ $user->email }}!</b>  
                </td>
            </tr>

            <tr>
                <td>
                    Thank you for registering with us! To complete your account setup, please verify your account by entering the 6-digit code below:
                </td>
            </tr>
            
            <tr>
                <td>
                    <b>Code Details:</b><br>
                    Code: <b> {{ $user->code }}</b><br>
                </td>
            </tr>

            <tr>
                <td>
                    This code will expire in <b>5 minutes</b>. If you did not request this verification, please ignore this email. Please click the link to verify your account<br>
                    <a href="{{ $link }}">Click me!</a>
                </td>
            </tr>

            <tr>
                <td>
                    <b>NOTE:</b> If your code expires, please contact your administrator to verify your account.<br>
                    We hope to assist you once more in the future.
                </td>
            </tr>

            <tr>
                <td style="padding-bottom: 20px;">
                    Best Regards <br> <span class="text-bold">{{ env('APP_NAME') }} Support Team</span>
                <td>
            </tr>

            <tr class="bg-secondary">
                <td class="text-center text-gray" style="padding-bottom: 20px;">
                    <small>© {{ date('Y') }} Joseph DLC. All Rights Reserved.</small> 
                <td>
            </tr>
        </table>
    </div>
</body>
</html>