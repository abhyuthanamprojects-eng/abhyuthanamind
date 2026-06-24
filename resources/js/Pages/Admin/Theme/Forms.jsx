import AdminLayout from '@/Layouts/AdminLayout';
import AdminHeader from '@/Components/Admin/AdminHeader';
import { Head } from '@inertiajs/react';
import { FileText } from 'lucide-react';

export default function Forms() {
    return (
        <AdminLayout>
            <Head title="Forms" />

            <AdminHeader title="Forms" subtitle="Bootstrap form controls available in the admin theme." icon={<FileText size={20} />} />

            <div className="card">
                <div className="card-body">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="row g-3">
                            <div className="col-12 col-md-6">
                                <label className="form-label">Text input</label>
                                <input type="text" className="form-control" placeholder="John Doe" />
                            </div>
                            <div className="col-12 col-md-6">
                                <label className="form-label">Select</label>
                                <select className="form-select">
                                    <option>Option one</option>
                                    <option>Option two</option>
                                    <option>Option three</option>
                                </select>
                            </div>
                            <div className="col-12">
                                <label className="form-label">Textarea</label>
                                <textarea className="form-control" rows="3"></textarea>
                            </div>
                            <div className="col-12">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="formsCheck" />
                                    <label className="form-check-label" htmlFor="formsCheck">Check me out</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="formsRadio" id="formsRadio1" defaultChecked />
                                    <label className="form-check-label" htmlFor="formsRadio1">Option A</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="formsRadio" id="formsRadio2" />
                                    <label className="form-check-label" htmlFor="formsRadio2">Option B</label>
                                </div>
                            </div>
                            <div className="col-12">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
