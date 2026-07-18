<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>E-Waste Manifest Form-6 {{ $doc->document_number }}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }

        @page { margin: 15mm 14mm; }

        body {
            font-family: 'Times New Roman', Times, serif;
            color: #000;
            font-size: 13px;
        }

        .header-top {
            text-align: center;
            font-size: 16px;
            line-height: 1.5;
            margin-bottom: 22px;
        }

        .form-title {
            text-align: center;
            font-size: 16px;
            margin-bottom: 14px;
            letter-spacing: 0.5px;
        }

        .main-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
            line-height: 1.4;
        }

        .main-table td {
            border: 1.5px solid #000;
            vertical-align: middle;
        }

        .label-cell {
            width: 42%;
            padding: 12px 14px;
            text-align: left;
            font-weight: normal;
        }

        .value-cell {
            width: 58%;
            padding: 12px 16px;
            text-align: center;
        }

        .value-bold {
            font-family: Helvetica, Arial, sans-serif;
            font-weight: bold;
            font-size: 14px;
        }

        .value-sub {
            font-family: Helvetica, Arial, sans-serif;
            font-weight: normal;
            font-size: 13px;
        }

        .value-serif { font-weight: normal; font-size: 13px; }
        .value-serif-bold { font-weight: bold; font-size: 13px; }

        .sig-cell {
            padding: 10px 14px;
            text-align: left;
            vertical-align: top !important;
        }

        .sig-title { font-size: 13px; line-height: 1.4; margin-bottom: 6px; }

        .sig-table { border-collapse: collapse; margin-top: 4px; }
        .sig-table td { border: none !important; padding: 0; vertical-align: bottom; }
        .sig-label { font-size: 13px; padding-right: 40px !important; }

        .date-headers-table { border-collapse: collapse; margin-bottom: 3px; }
        .date-headers-table td { border: none !important; font-size: 12px; text-align: center; padding: 0; }

        .date-table { border-collapse: collapse; }
        .date-table td {
            width: 25px;
            height: 25px;
            border: 1.5px solid #000 !important;
            text-align: center;
            font-size: 13px;
            padding: 0;
        }

        .footnote { font-size: 13px; margin-top: 10px; }

        .notes-block { margin-top: 14px; font-size: 13px; }
        .notes-title { margin-bottom: 8px; }

        .notes-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
            line-height: 1.4;
        }

        .notes-table td {
            border: 1.5px solid #000;
            padding: 9px 12px;
            vertical-align: top;
            text-align: left;
        }

        .notes-col1 { width: 22%; }
    </style>
</head>
<body>

@php
    $pickupDate = !empty($data['pickup_date']) ? \Carbon\Carbon::parse($data['pickup_date']) : ($doc->issued_at ?? now());
    // Date boxes: MM - DD - YYYY (e.g. 0 6 - 1 5 - 2 0 2 6)
    $dateChars = array_merge(
        str_split($pickupDate->format('m')), ['-'],
        str_split($pickupDate->format('d')), ['-'],
        str_split($pickupDate->format('Y')), ['']
    );

    $dateGrid = '<table class="sig-table"><tr><td class="sig-label">Signature:</td><td>'
        . '<table class="date-headers-table"><tr>'
        . '<td style="width:76px;">Month</td><td style="width:76px;">Day</td><td style="width:128px;">Year</td>'
        . '</tr></table>'
        . '<table class="date-table"><tr>';
    foreach ($dateChars as $ch) {
        $dateGrid .= '<td>' . e($ch) . '</td>';
    }
    $dateGrid .= '</tr></table></td></tr></table>';
@endphp

<div class="header-top">
    Form-6<br>
    [See rule 19]
</div>

<div class="form-title">E-WASTE MANIFEST</div>

<table class="main-table">

    {{-- Field 1 : Sender --}}
    <tr>
        <td class="label-cell">1. Sender&rsquo;s name and mailing address (including Phone No.)</td>
        <td class="value-cell">
            <div class="value-bold">{{ $data['sender_name'] ?? '—' }}</div>
            <div class="value-sub">{{ $data['sender_address'] ?? '' }}</div>
            @if (!empty($data['sender_phone']))
                <div class="value-sub">Ph: {{ $data['sender_phone'] }}</div>
            @endif
        </td>
    </tr>

    {{-- Field 2 : Sender authorization --}}
    <tr>
        <td class="label-cell">2. Sender&rsquo;s authorization No, if applicable.</td>
        <td class="value-cell"><span class="value-bold">{{ $data['sender_authorization_no'] ?? 'Not Applicable' }}</span></td>
    </tr>

    {{-- Field 3 : Manifest No --}}
    <tr>
        <td class="label-cell">3. Manifest Document No.</td>
        <td class="value-cell"><span class="value-bold">{{ $doc->document_number ?? '—' }}</span></td>
    </tr>

    {{-- Field 4 : Transporter --}}
    <tr>
        <td class="label-cell">4. Transporter&rsquo;s Name and address (including Phone No.)</td>
        <td class="value-cell">
            <div class="value-serif-bold">{{ $data['transporter_name'] ?? '—' }}</div>
            <div class="value-serif">{{ $data['transporter_address'] ?? '' }}</div>
            @if (!empty($data['transporter_phone']))
                <div class="value-serif">Ph: {{ $data['transporter_phone'] }}</div>
            @endif
        </td>
    </tr>

    {{-- Field 5 : Vehicle type --}}
    <tr>
        <td class="label-cell">5. Type of vehicle</td>
        <td class="value-cell"><span class="value-serif">{{ $data['vehicle_type'] ?? '(Truck or Tanker or Special Vehicle)' }}</span></td>
    </tr>

    {{-- Field 6 : Transporter registration --}}
    <tr>
        <td class="label-cell">6. Transporter/s registration No.</td>
        <td class="value-cell"><span class="value-bold">{{ $data['transporter_registration_no'] ?? '—' }}</span></td>
    </tr>

    {{-- Field 7 : Vehicle registration --}}
    <tr>
        <td class="label-cell">7. Vehicle registration No.</td>
        <td class="value-cell"><span class="value-bold">{{ $data['vehicle_registration_no'] ?? '—' }}</span></td>
    </tr>

    {{-- Field 8 : Receiver --}}
    <tr>
        <td class="label-cell">8. Receiver name &amp; address:</td>
        <td class="value-cell">
            <div class="value-bold">{{ $data['receiver_name'] ?? 'Abhyuthanam Industries Pvt. Ltd.' }}</div>
            <div class="value-sub">{{ $data['receiver_address'] ?? 'E-15, UPSIDC PLASTIC CITY, DIBIYAPUR, UP - 206244' }}</div>
        </td>
    </tr>

    {{-- Field 9 : Receiver authorization --}}
    <tr>
        <td class="label-cell">9. Receiver&rsquo;s authorization No, if applicable.</td>
        <td class="value-cell"><span class="value-bold">{{ $data['receiver_authorization_no'] ?? '236093/UPPCB' }}</span></td>
    </tr>

    {{-- Field 10 : Description --}}
    <tr>
        <td class="label-cell">10. Description of E-Waste (Item, Weight/Numbers):</td>
        <td class="value-cell"><span class="value-bold">{{ $data['ewaste_description'] ?? '—' }}</span></td>
    </tr>

    {{-- Field 11 : Sender signature --}}
    <tr>
        <td class="sig-cell" colspan="2">
            <div class="sig-title">11. Name and stamp of Sender* (Manufacturer or Producer or Bulk Consumer or Collection Centre or Refurbisher or Dismantler):</div>
            {!! $dateGrid !!}
        </td>
    </tr>

    {{-- Field 12 : Transporter acknowledgement --}}
    <tr>
        <td class="sig-cell" colspan="2">
            <div class="sig-title">12. Transporter acknowledgement of receipt of E-Wastes</div>
            <div class="sig-title">Name and stamp:</div>
            {!! $dateGrid !!}
        </td>
    </tr>

    {{-- Field 13 : Receiver certification --}}
    <tr>
        <td class="sig-cell" colspan="2">
            <div class="sig-title">13. Receiver* (Collection Centre or Refurbisher or Dismantler or Recycler) certification of receipt of E-waste</div>
            <div class="sig-title">Name and stamp:</div>
            {!! $dateGrid !!}
        </td>
    </tr>
</table>

<div class="footnote">* As applicable</div>

<div class="notes-block">
    <div class="notes-title">Note:-</div>
    <table class="notes-table">
        <tr>
            <td class="notes-col1">Copy number with colour code<br>(1)</td>
            <td>Purpose (2)</td>
        </tr>
        <tr>
            <td class="notes-col1">Copy 1 (Yellow)</td>
            <td>To be retained by the sender after taking signature on it from the transporter and other three copies will be carried by transporter.</td>
        </tr>
        <tr>
            <td class="notes-col1">Copy 2 (Pink)</td>
            <td>To be retained by the receiver after signature of the transporter.</td>
        </tr>
        <tr>
            <td class="notes-col1">Copy 3 (Orange)</td>
            <td>To be retained by the transporter after taking signature of the receiver.</td>
        </tr>
        <tr>
            <td class="notes-col1">Copy 4 (Green)</td>
            <td>To be returned by the receiver with his/her signature to the sender</td>
        </tr>
    </table>
</div>

</body>
</html>
