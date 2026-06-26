import AdminLayout from '@/Layouts/AdminLayout';
import AdminHeader from '@/Components/Admin/AdminHeader';
import { Head } from '@inertiajs/react';
import { Type } from 'lucide-react';

export default function Typography() {
    return (
        <AdminLayout>
            <Head title="Typography" />

            <AdminHeader title="Typography" subtitle="Headings, text styles, and lists available in the admin theme." icon={<Type size={20} />} />

            <div className="card">
                <div className="card-body">
                    <h1>Heading 1</h1>
                    <h2>Heading 2</h2>
                    <h3>Heading 3</h3>
                    <h4>Heading 4</h4>
                    <h5>Heading 5</h5>
                    <h6>Heading 6</h6>
                    <p className="mt-3">
                        This is a regular paragraph with <strong>bold</strong>, <em>italic</em>, and <a href="#!">linked</a> text.
                    </p>
                    <p className="text-secondary">Muted secondary text used for descriptions.</p>
                    <ul>
                        <li>Unordered list item one</li>
                        <li>Unordered list item two</li>
                    </ul>
                    <ol>
                        <li>Ordered list item one</li>
                        <li>Ordered list item two</li>
                    </ol>
                    <blockquote className="blockquote">
                        <p className="mb-0">A well-known quote, contained in a blockquote element.</p>
                    </blockquote>
                </div>
            </div>
        </AdminLayout>
    );
}
