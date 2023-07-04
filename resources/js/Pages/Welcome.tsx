import { Link, Head, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { QRCodeSVG } from 'qrcode.react';

export default function Welcome() {
    
    return (
        <>
            <Head title="Welcome" />
            <div className="flex items-center justify-center min-h-screen gap-4 bg-neutral-900 text-neutral-300">
                <Link href={ `/menu` } className='flex flex-col items-center p-2 border rounded-md bg-neutral-800 border-neutral-600'>
                    <h2 className='m-2 text-3xl font-bold'>Menu del Dia:</h2>
                    <QRCodeSVG value={`${window.location.host}/menu` } includeMargin={true} size={ 250 } bgColor='rgb(38 38 38 )' fgColor='rgb(212 212 212)'/>
                </Link>
            </div>
        </>
    );
}
