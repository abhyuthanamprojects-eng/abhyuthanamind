<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Green Certificate {{ $doc->document_number }}</title>
    <style>
        body { font-family: DejaVu Sans, Arial, sans-serif; color: #1f2933; margin: 0; padding: 0; font-size: 13px; }
        .sheet { border: 6px double #16a34a; margin: 24px; padding: 36px; }
        .header { text-align: center; }
        .header img { height: 50px; }
        .iso { font-size: 11px; color: #6b7280; letter-spacing: 0.08em; margin-top: 6px; }
        .title { font-size: 26px; font-weight: 800; color: #14532d; letter-spacing: 0.06em; margin: 10px 0 0; }
        .ref-row { display: flex; justify-content: space-between; font-size: 11px; color: #374151; margin: 18px 0; font-weight: 600; }
        .body p { text-align: center; color: #111827; line-height: 1.8; margin: 16px 0; }
        .body strong { color: #14532d; }
        .stats { display: flex; justify-content: center; gap: 28px; margin: 22px 0; }
        .stat { text-align: center; }
        .stat .v { font-size: 22px; font-weight: 800; color: #16a34a; }
        .stat .l { font-size: 10px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; }
        .footer { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 40px; }
        .footer .sign { text-align: center; }
        .footer .sign p { margin: 0; font-weight: bold; color: #14532d; }
        .footer .sign small { color: #6b7280; }
        .footer .company { font-size: 10px; color: #6b7280; text-align: right; line-height: 1.5; }
        .thanks { text-align: center; margin-top: 22px; font-size: 12px; color: #16a34a; font-weight: 700; }
        .no-print { margin: 16px 24px 0; }
        @media print { .no-print { display: none; } }
    </style>
</head>
<body>
    <div class="no-print">
        <button onclick="window.print()" style="padding:8px 16px;background:#16a34a;color:#fff;border:none;border-radius:6px;cursor:pointer;">Print / Save as PDF</button>
    </div>

    <div class="sheet">
        <div class="header">
            <img src="{{ asset('images/logo.png') }}" alt="Logo">
            <p class="iso">AN ISO 9001:2015 CERTIFIED ORGANIZATION</p>
            <p class="title">GREEN CERTIFICATE</p>
        </div>

        <div class="ref-row">
            <span>REF. No: {{ $doc->document_number ?? '—' }}</span>
            <span>Regd No: {{ $data['registration_no'] ?? '236093/UPPCB' }}</span>
        </div>

        <div class="body">
            <p>
                This is to certify that <strong>ABHYUTHANAM INDUSTRIES PVT LTD</strong> has reserved rights and
                ownership of e-waste materials received from<br>
                <strong>{{ $data['client_company_name'] ?? '—' }}</strong>
            </p>
            <p>
                All material has been processed e.g. segregated, dismantled &amp; recycled safely as per the
                guidelines of e-waste management and handling process.
            </p>
            <p style="font-size:11px;color:#6b7280;">
                Against Manifest No: {{ $data['manifest_number'] ?? '—' }} &nbsp;||&nbsp;
                Tax Invoice No: {{ $data['tax_invoice_number'] ?? '—' }} &nbsp;||&nbsp;
                Dated: {{ $data['date'] ?? now()->format('d/m/y') }}
            </p>
        </div>

        @if(!empty($data['recycled_percentage']) || !empty($data['refurbished_percentage']))
            <div class="stats">
                <div class="stat"><div class="v">{{ $data['recycled_percentage'] ?? 0 }}%</div><div class="l">Recycled</div></div>
                <div class="stat"><div class="v">{{ $data['refurbished_percentage'] ?? 0 }}%</div><div class="l">Refurbished</div></div>
                @if(!empty($data['quantity']))
                    <div class="stat"><div class="v">{{ $data['quantity'] }}</div><div class="l">Quantity</div></div>
                @endif
            </div>
        @endif

        <div class="thanks">Thank You!! For your green earth contribution.</div>

        <div class="footer">
            <div class="sign">
                <p>{{ $data['director_name'] ?? 'Manju Ojha' }}</p>
                <small>(Director)</small>
            </div>
            <div class="company">
                ABHYUTHANAM INDUSTRIES PRIVATE LIMITED<br>
                CIN: U38120DL2023PTC410946<br>
                E-15, I.A, Plastic City, Dibiyapur, Auraiya, UP 206244
            </div>
        </div>
    </div>
</body>
</html>
