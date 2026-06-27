<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Pickup Request {{ $pickup->booking_id }}</title>
    <style>
        body { font-family: DejaVu Sans, Arial, sans-serif; color: #1f2933; margin: 0; padding: 32px; font-size: 13px; }
        .header { display: flex; align-items: center; justify-content: space-between; border-bottom: 3px solid #16a34a; padding-bottom: 16px; margin-bottom: 24px; }
        .header img { height: 48px; }
        .header h1 { font-size: 18px; margin: 0; color: #14532d; }
        .booking-id { font-size: 14px; font-weight: bold; color: #16a34a; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        td { padding: 6px 4px; vertical-align: top; }
        .label { color: #6b7280; width: 38%; font-weight: 600; }
        .value { color: #111827; }
        .section-title { font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.04em; color: #14532d; margin: 18px 0 8px; border-bottom: 1px solid #d1fae5; padding-bottom: 4px; }
        .status-badge { display: inline-block; padding: 3px 10px; border-radius: 999px; background: #dcfce7; color: #166534; font-weight: 600; font-size: 12px; }
        .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e7eb; font-size: 11px; color: #6b7280; text-align: center; }
        @media print {
            .no-print { display: none; }
        }
    </style>
</head>
<body>
    <div class="header">
        <img src="{{ asset('images/logo.png') }}" alt="Logo">
        <div style="text-align:right;">
            <h1>Pickup Request Details</h1>
            <div class="booking-id">Booking ID: {{ $pickup->booking_id }}</div>
        </div>
    </div>

    <div class="no-print" style="margin-bottom:16px;">
        <button onclick="window.print()" style="padding:8px 16px;background:#16a34a;color:#fff;border:none;border-radius:6px;cursor:pointer;">Print / Save as PDF</button>
    </div>

    <div class="section-title">Booking Summary</div>
    <table>
        <tr><td class="label">Booking ID</td><td class="value">{{ $pickup->booking_id }}</td></tr>
        <tr><td class="label">Status</td><td class="value"><span class="status-badge">{{ $statusLabel }}</span></td></tr>
        <tr><td class="label">Submitted On</td><td class="value">{{ $pickup->created_at->format('d M Y, h:i A') }}</td></tr>
    </table>

    <div class="section-title">Customer Details</div>
    <table>
        <tr><td class="label">Name</td><td class="value">{{ $pickup->customer_name ?? '—' }}</td></tr>
        <tr><td class="label">Mobile</td><td class="value">{{ $maskedPhone }}</td></tr>
        <tr><td class="label">Email</td><td class="value">{{ $pickup->customer_email ?? '—' }}</td></tr>
        <tr><td class="label">City</td><td class="value">{{ $city ?? '—' }}</td></tr>
        <tr><td class="label">Pickup Address</td><td class="value">{{ $pickup->address ?? '—' }}</td></tr>
    </table>

    <div class="section-title">Pickup Details</div>
    <table>
        <tr><td class="label">Scrap Category</td><td class="value">{{ $lead['scrap_category'] ?? '—' }}</td></tr>
        <tr><td class="label">Selected Item</td><td class="value">{{ $lead['selected_scrap_item'] ?? '—' }}</td></tr>
        <tr><td class="label">Approximate Quantity</td><td class="value">{{ $lead['approximate_quantity'] ?? '—' }}</td></tr>
        <tr><td class="label">Preferred Pickup Date/Time</td><td class="value">{{ $pickup->scheduled_at?->format('d M Y, h:i A') ?? '—' }}</td></tr>
        <tr><td class="label">Description</td><td class="value">{{ $lead['description'] ?? '—' }}</td></tr>
    </table>

    <div class="footer">
        {{ $companyName }} &middot; {{ $companyPhone }} &middot; {{ $companyEmail }}<br>
        {{ $companyAddress }}
    </div>
</body>
</html>
