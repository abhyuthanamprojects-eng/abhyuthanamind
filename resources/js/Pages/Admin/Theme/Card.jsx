import AdminLayout from '@/Layouts/AdminLayout';
import AdminHeader from '@/Components/Admin/AdminHeader';
import { Head } from '@inertiajs/react';
import { BookMarked } from 'lucide-react';

export default function Card() {
    return (
        <AdminLayout>
            <Head title="Card" />

            <AdminHeader title="Card" subtitle="Bootstrap card layouts available in the admin theme." icon={<BookMarked size={20} />} />

            <div className="row g-4">
                <div className="col-12 col-md-4">
                    <div className="card h-100">
                        <div className="card-body">
                            <h5 className="card-title">Basic Card</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <button type="button" className="btn btn-primary">Go somewhere</button>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="card h-100">
                        <div className="card-header bg-transparent">Featured</div>
                        <div className="card-body">
                            <h5 className="card-title">Card with header</h5>
                            <p className="card-text">A card with a header and supporting body text.</p>
                        </div>
                        <div className="card-footer bg-transparent text-secondary">2 days ago</div>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="card h-100 border-primary">
                        <div className="card-body">
                            <h5 className="card-title text-primary">Bordered Card</h5>
                            <p className="card-text">Cards support a wide variety of content and color combinations.</p>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
