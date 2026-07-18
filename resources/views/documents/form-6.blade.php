<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>E-Waste Manifest Form-6</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Times New Roman', Times, serif;
            background-color: #f0f0f0;
            padding: 15px;
            color: #000;
        }

        .container {
            width: 100%;
            max-width: 900px;
            background-color: #fff;
            margin: 0 auto;
            padding: 50px 60px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
        }

        /* HEADER - centered, not bold, plain text */
        .header-top {
            text-align: center;
            font-size: 16px;
            line-height: 1.5;
            margin-bottom: 25px;
        }

        .form-title {
            text-align: center;
            font-size: 16px;
            margin-bottom: 15px;
            letter-spacing: 0.5px;
        }

        /* MAIN TABLE */
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

        /* LEFT LABEL COLUMN - plain serif, no bold, no background */
        .label-cell {
            width: 42%;
            padding: 14px 16px;
            text-align: left;
            background-color: #fff;
            font-weight: normal;
        }

        /* RIGHT VALUE COLUMN - centered text */
        .value-cell {
            width: 58%;
            padding: 14px 20px;
            text-align: center;
            background-color: #fff;
        }

        /* Bold sans-serif values like PDF */
        .value-bold {
            font-family: 'Segoe UI', Calibri, Arial, sans-serif;
            font-weight: bold;
            font-size: 14px;
        }

        .value-sub {
            font-family: 'Segoe UI', Calibri, Arial, sans-serif;
            font-weight: normal;
            font-size: 13px;
        }

        .value-serif {
            font-family: 'Times New Roman', Times, serif;
            font-weight: normal;
            font-size: 13px;
        }

        .value-serif-bold {
            font-family: 'Times New Roman', Times, serif;
            font-weight: bold;
            font-size: 13px;
        }

        /* SIGNATURE ROWS (11, 12, 13) - full width cells */
        .sig-cell {
            padding: 12px 16px;
            text-align: left;
            vertical-align: top !important;
        }

        .sig-title {
            font-size: 13px;
            line-height: 1.4;
            margin-bottom: 8px;
        }

        .sig-line-row {
            display: flex;
            align-items: flex-end;
            gap: 30px;
            margin-top: 6px;
        }

        .sig-label {
            font-size: 13px;
            white-space: nowrap;
        }

        /* DATE GRID like PDF */
        .date-wrap {
            display: inline-block;
            margin-left: 60px;
        }

        .date-headers {
            display: flex;
            font-size: 13px;
            margin-bottom: 4px;
        }

        .dh-month { width: 76px; text-align: center; }
        .dh-day { width: 76px; text-align: center; }
        .dh-year { width: 128px; text-align: center; }

        .date-boxes {
            display: flex;
        }

        .date-box {
            width: 25px;
            height: 26px;
            border: 1.5px solid #000;
            border-right: none;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 13px;
            background-color: #fff;
        }

        .date-box:last-child {
            border-right: 1.5px solid #000;
        }

        .date-box.empty {
            /* trailing empty box like PDF */
        }

        /* NOTES SECTION */
        .footnote {
            font-size: 13px;
            margin-top: 10px;
        }

        .notes-block {
            margin-top: 15px;
            font-size: 13px;
        }

        .notes-title {
            margin-bottom: 8px;
        }

        .notes-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
            line-height: 1.4;
        }

        .notes-table td {
            border: 1.5px solid #000;
            padding: 10px 14px;
            vertical-align: top;
            text-align: left;
        }

        .notes-col1 {
            width: 22%;
        }

        .print-btn {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 24px;
            background: #2196F3;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-weight: bold;
            font-size: 14px;
            font-family: Arial, sans-serif;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
            z-index: 999;
        }

        .print-btn:hover {
            background: #0b7dda;
        }

        @media print {
            body {
                background-color: white;
                padding: 0;
            }
            .container {
                box-shadow: none;
                max-width: 100%;
                padding: 15mm 18mm;
                margin: 0;
            }
            .print-btn {
                display: none;
            }
        }
    </style>
</head>
<body>

@php
    $pickupDate = !empty($data['pickup_date']) ? \Carbon\Carbon::parse($data['pickup_date']) : ($doc->issued_at ?? now());
    // MM - DD - YYYY characters for the date boxes, plus trailing empty box
    $dateChars = array_merge(
        str_split($pickupDate->format('m')), ['-'],
        str_split($pickupDate->format('d')), ['-'],
        str_split($pickupDate->format('Y'))
    );
@endphp

    <button class="print-btn" onclick="window.print()">🖨️ Print / PDF</button>

    <div class="container">

        <!-- HEADER : centered, plain, no bold -->
        <div class="header-top">
            Form-6<br>
            [See rule 19]
        </div>

        <div class="form-title">E-WASTE MANIFEST</div>

        <!-- MAIN TABLE : Fields 1 - 13 in ONE continuous table like PDF -->
        <table class="main-table">

            <!-- Field 1 -->
            <tr>
                <td class="label-cell">1. Sender&rsquo;s name and mailing address (including Phone No.)</td>
                <td class="value-cell">
                    <div class="value-bold">{{ $data['sender_name'] ?? '—' }}</div>
                    <div class="value-sub" style="font-weight:normal;">{{ $data['sender_address'] ?? '' }}@if (!empty($data['sender_phone'])) &mdash; Ph: {{ $data['sender_phone'] }}@endif</div>
                </td>
            </tr>

            <!-- Field 2 -->
            <tr>
                <td class="label-cell">2. Sender&rsquo;s authorization No, if applicable.</td>
                <td class="value-cell"><span class="value-bold">{{ $data['sender_authorization_no'] ?? 'Not Applicable' }}</span></td>
            </tr>

            <!-- Field 3 -->
            <tr>
                <td class="label-cell">3. Manifest Document No.</td>
                <td class="value-cell"><span class="value-bold">{{ $doc->document_number ?? '—' }}</span></td>
            </tr>

            <!-- Field 4 -->
            <tr>
                <td class="label-cell">4. Transporter&rsquo;s Name and address (including Phone No.)</td>
                <td class="value-cell">
                    <div class="value-serif-bold">{{ $data['transporter_name'] ?? '—' }}</div>
                    <div class="value-serif">{{ $data['transporter_address'] ?? '' }}@if (!empty($data['transporter_phone'])) &mdash; Ph: {{ $data['transporter_phone'] }}@endif</div>
                </td>
            </tr>

            <!-- Field 5 -->
            <tr>
                <td class="label-cell">5. Type of vehicle</td>
                <td class="value-cell"><span class="value-serif">{{ $data['vehicle_type'] ?? '(Truck or Tanker or Special Vehicle)' }}</span></td>
            </tr>

            <!-- Field 6 -->
            <tr>
                <td class="label-cell">6. Transporter/s registration No.</td>
                <td class="value-cell"><span class="value-bold">{{ $data['transporter_registration_no'] ?? '—' }}</span></td>
            </tr>

            <!-- Field 7 -->
            <tr>
                <td class="label-cell">7. Vehicle registration No.</td>
                <td class="value-cell"><span class="value-bold">{{ $data['vehicle_registration_no'] ?? '—' }}</span></td>
            </tr>

            <!-- Field 8 -->
            <tr>
                <td class="label-cell">8. Receiver name &amp; address:</td>
                <td class="value-cell">
                    <div class="value-bold">{{ $data['receiver_name'] ?? 'Abhyuthanam Industries Pvt. Ltd.' }}</div>
                    <div class="value-sub" style="font-weight:normal;">{{ $data['receiver_address'] ?? 'E-15, UPSIDC PLASTIC CITY, DIBIYAPUR, UP - 206244' }}</div>
                </td>
            </tr>

            <!-- Field 9 -->
            <tr>
                <td class="label-cell">9. Receiver&rsquo;s authorization No, if applicable.</td>
                <td class="value-cell"><span class="value-bold">{{ $data['receiver_authorization_no'] ?? '236093/UPPCB' }}</span></td>
            </tr>

            <!-- Field 10 -->
            <tr>
                <td class="label-cell">10. Description of E-Waste (Item, Weight/Numbers):</td>
                <td class="value-cell"><span class="value-bold">{{ $data['ewaste_description'] ?? '—' }}</span></td>
            </tr>

            <!-- Field 11 : Sender signature - full width -->
            <tr>
                <td class="sig-cell" colspan="2">
                    <div class="sig-title">11. Name and stamp of Sender* (Manufacturer or Producer or Bulk Consumer or Collection Centre or Refurbisher or Dismantler):</div>
                    <div class="sig-line-row">
                        <span class="sig-label">Signature:</span>
                        <div class="date-wrap">
                            <div class="date-headers">
                                <span class="dh-month">Month</span>
                                <span class="dh-day">Day</span>
                                <span class="dh-year">Year</span>
                            </div>
                            <div class="date-boxes">
                                @foreach ($dateChars as $ch)
                                <div class="date-box">{{ $ch }}</div>
                                @endforeach
                                <div class="date-box empty"></div>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>

            <!-- Field 12 : Transporter acknowledgement -->
            <tr>
                <td class="sig-cell" colspan="2">
                    <div class="sig-title">12. Transporter acknowledgement of receipt of E-Wastes</div>
                    <div class="sig-title">Name and stamp:</div>
                    <div class="sig-line-row">
                        <span class="sig-label">Signature:</span>
                        <div class="date-wrap">
                            <div class="date-headers">
                                <span class="dh-month">Month</span>
                                <span class="dh-day">Day</span>
                                <span class="dh-year">Year</span>
                            </div>
                            <div class="date-boxes">
                                @foreach ($dateChars as $ch)
                                <div class="date-box">{{ $ch }}</div>
                                @endforeach
                                <div class="date-box empty"></div>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>

            <!-- Field 13 : Receiver certification -->
            <tr>
                <td class="sig-cell" colspan="2">
                    <div class="sig-title">13. Receiver* (Collection Centre or Refurbisher or Dismantler or Recycler) certification of receipt of E-waste</div>
                    <div class="sig-title">Name and stamp:</div>
                    <div class="sig-line-row">
                        <span class="sig-label">Signature:</span>
                        <div class="date-wrap">
                            <div class="date-headers">
                                <span class="dh-month">Month</span>
                                <span class="dh-day">Day</span>
                                <span class="dh-year">Year</span>
                            </div>
                            <div class="date-boxes">
                                @foreach ($dateChars as $ch)
                                <div class="date-box">{{ $ch }}</div>
                                @endforeach
                                <div class="date-box empty"></div>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        </table>

        <!-- FOOTNOTE -->
        <div class="footnote">* As applicable</div>

        <!-- NOTES -->
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

    </div>

</body>
</html>
