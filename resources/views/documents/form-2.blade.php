<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Form 2 — Recycling Certificate {{ $doc->document_number }}</title>
    <style>
        body { font-family: DejaVu Sans, Arial, sans-serif; color: #1f2933; margin: 0; padding: 40px; font-size: 13px; line-height: 1.7; }
        .header { text-align: center; border-bottom: 3px solid #16a34a; padding-bottom: 14px; margin-bottom: 26px; }
        .header img { height: 48px; }
        .header h1 { font-size: 17px; margin: 10px 0 0; color: #14532d; text-transform: uppercase; letter-spacing: 0.03em; }
        .header h2 { font-size: 12px; margin: 4px 0 0; color: #6b7280; font-weight: 600; }
        .body p { margin: 0 0 14px; color: #111827; text-align: justify; }
        .meta { margin-top: 30px; display: flex; justify-content: space-between; }
        .meta div { font-size: 12px; color: #374151; }
        .signature { margin-top: 50px; text-align: right; }
        .signature p { margin: 0; font-weight: bold; color: #14532d; }
        .no-print { margin-bottom: 16px; }
        @media print { .no-print { display: none; } }
    </style>
</head>
<body>
    <div class="header">
        <img src="{{ asset('images/logo.png') }}" alt="Logo">
        <h1>Recycling Certificate as Form 2</h1>
        <h2>TO WHOM SO EVER IT MAY CONCERN</h2>
    </div>

    <div class="no-print">
        <button onclick="window.print()" style="padding:8px 16px;background:#16a34a;color:#fff;border:none;border-radius:6px;cursor:pointer;">Print / Save as PDF</button>
    </div>

    <div class="body">
        <p>
            This is to certify that our organization M/S Abhyuthanam Industries Private Limited, authorized by the
            Uttar Pradesh State Pollution Control Board for Collection, Segregation, Dismantling &amp; Recycling of
            E-Waste through Registration No. {{ $data['registration_no'] ?? '236093/UPPCB' }} (UPPCBRO), valid till
            {{ $data['valid_till'] ?? '—' }}.
        </p>
        <p>
            We certify that the e-waste submitted by <strong>{{ $data['client_company_name'] ?? '—' }}</strong>,
            {{ $data['client_address'] ?? '' }}, vide their Tax Invoice No. {{ $data['tax_invoice_number'] ?? '—' }}
            has handed over <strong>{{ $data['weight_kg'] ?? '—' }} KG</strong> through Vehicle No.
            {{ $data['vehicle_number'] ?? '—' }} of e-waste for further Collection, Segregation, Dismantling &amp;
            Recycling against Manifest No. {{ $data['manifest_number'] ?? '—' }}, and has also been segregated,
            dismantled and recycled safely as per the guidelines of UPPCB. Records are being submitted to the Uttar
            Pradesh State Pollution Control Board for Collection, Segregation, Dismantling and Recycling of E-waste
            through Form-3.
        </p>
        @if(!empty($data['notes']))
            <p>{{ $data['notes'] }}</p>
        @endif
    </div>

    <div class="signature">
        <p>{{ $data['director_name'] ?? 'Manju Ojha' }}</p>
        <p style="font-weight:normal;color:#6b7280;">{{ $data['date'] ?? now()->format('d/m/Y') }}</p>
    </div>

    <p style="font-size:11px;color:#6b7280;text-align:center;margin-top:40px;">
        Generated for Booking ID {{ $pickup->booking_id }} on {{ $doc->issued_at?->format('d M Y') ?? now()->format('d M Y') }}
    </p>
</body>
</html>
