<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Form 6 — E-Waste Manifest {{ $doc->document_number }}</title>
    <style>
        body { font-family: DejaVu Sans, Arial, sans-serif; color: #1f2933; margin: 0; padding: 32px; font-size: 13px; }
        .header { text-align: center; border-bottom: 3px solid #16a34a; padding-bottom: 14px; margin-bottom: 20px; }
        .header img { height: 44px; }
        .header h1 { font-size: 16px; margin: 8px 0 2px; color: #14532d; text-transform: uppercase; }
        .header p { margin: 0; font-size: 11px; color: #6b7280; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
        td, th { padding: 7px 8px; vertical-align: top; border: 1px solid #d1d5db; font-size: 12px; }
        .num { width: 5%; text-align: center; font-weight: bold; background: #f0fdf4; }
        .label { width: 32%; font-weight: 600; color: #374151; background: #f9fafb; }
        .value { color: #111827; }
        .sign-row td { height: 60px; }
        .no-print { margin-bottom: 16px; }
        @media print { .no-print { display: none; } }
    </style>
</head>
<body>
    <div class="header">
        <img src="{{ asset('images/logo.png') }}" alt="Logo">
        <h1>Form-6 — E-Waste Manifest</h1>
        <p>[See Rule 19]</p>
    </div>

    <div class="no-print">
        <button onclick="window.print()" style="padding:8px 16px;background:#16a34a;color:#fff;border:none;border-radius:6px;cursor:pointer;">Print / Save as PDF</button>
    </div>

    <table>
        <tr><td class="num">1</td><td class="label">Sender's Name &amp; Mailing Address (incl. Phone No.)</td><td class="value">{{ $data['sender_name'] ?? '—' }}<br>{{ $data['sender_address'] ?? '' }}<br>{{ $data['sender_phone'] ?? '' }}</td></tr>
        <tr><td class="num">2</td><td class="label">Sender's Authorization No. (if applicable)</td><td class="value">{{ $data['sender_authorization_no'] ?? '—' }}</td></tr>
        <tr><td class="num">3</td><td class="label">Manifest Document No.</td><td class="value">{{ $doc->document_number ?? '—' }}</td></tr>
        <tr><td class="num">4</td><td class="label">Transporter's Name &amp; Address (incl. Phone No.)</td><td class="value">{{ $data['transporter_name'] ?? '—' }}<br>{{ $data['transporter_address'] ?? '' }}<br>{{ $data['transporter_phone'] ?? '' }}</td></tr>
        <tr><td class="num">5</td><td class="label">Type of Vehicle</td><td class="value">{{ $data['vehicle_type'] ?? '—' }}</td></tr>
        <tr><td class="num">6</td><td class="label">Transporter's Registration No.</td><td class="value">{{ $data['transporter_registration_no'] ?? '—' }}</td></tr>
        <tr><td class="num">7</td><td class="label">Vehicle Registration No.</td><td class="value">{{ $data['vehicle_registration_no'] ?? '—' }}</td></tr>
        <tr><td class="num">8</td><td class="label">Receiver Name &amp; Address</td><td class="value">{{ $data['receiver_name'] ?? 'Abhyuthanam Industries Pvt. Ltd.' }}<br>{{ $data['receiver_address'] ?? 'E-15, I.A Plastic City, Dist – Auraiya, Uttar Pradesh – 206244' }}</td></tr>
        <tr><td class="num">9</td><td class="label">Receiver's Authorization No.</td><td class="value">{{ $data['receiver_authorization_no'] ?? '236093/UPPCB' }}</td></tr>
        <tr><td class="num">10</td><td class="label">Description of E-Waste (Item, Weight/Numbers)</td><td class="value">{{ $data['ewaste_description'] ?? '—' }}</td></tr>
        <tr class="sign-row"><td class="num">11</td><td class="label">Name &amp; Stamp of Sender — Signature / Date</td><td class="value">{{ $data['sender_name'] ?? '' }}&nbsp;&nbsp;&nbsp;&nbsp;Date: {{ $data['pickup_date'] ?? '—' }}</td></tr>
        <tr class="sign-row"><td class="num">12</td><td class="label">Transporter Acknowledgement of Receipt — Signature / Date</td><td class="value">{{ $data['transporter_name'] ?? '' }}</td></tr>
    </table>

    <p style="font-size:11px;color:#6b7280;text-align:center;margin-top:24px;">
        Generated for Booking ID {{ $pickup->booking_id }} on {{ $doc->issued_at?->format('d M Y') ?? now()->format('d M Y') }}
    </p>
</body>
</html>
