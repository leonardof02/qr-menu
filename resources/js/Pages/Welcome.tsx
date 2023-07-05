import { Link, Head } from "@inertiajs/react";
import { QRCodeSVG } from "qrcode.react";

export default function Welcome() {
    return (
        <>
            <Head title="QR Menu" />
            <div className="min-h-screen bg-neutral-200 text-neutral-900">
                <div className="flex flex-col items-center justify-center p-5 text-center">
                    <h1 className="text-4xl font-extrabold">Bienvenido al QR Menu</h1>
                    <h2 className="tracking-widest">Administre su menu y acceda escaneando el QR</h2>
                    <div className="flex flex-col gap-3 m-5 md:flex-row">
                        <Link href="/admin/auth">
                            <button className="p-2 font-bold uppercase border shadow-sm border-slate-500 bg-slate-900 text-neutral-200">Autenticarse</button>
                        </Link>
                        <Link href="/admin/products">
                            <button className="p-2 font-bold uppercase border shadow-sm border-slate-500 bg-slate-900 text-neutral-200">Panel de administracion</button>
                        </Link>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-4">
                    <Link
                        href={`/menu`}
                        className="flex flex-col items-center p-2 border rounded-md bg-neutral-800 border-neutral-600"
                    >
                        <h2 className="m-2 text-3xl font-bold text-neutral-200">
                            Menu del Dia:
                        </h2>
                        <QRCodeSVG
                            value={`${window.location.host}/menu`}
                            includeMargin={true}
                            size={250}
                            bgColor="rgb(38 38 38 )"
                            fgColor="rgb(212 212 212)"
                        />
                    </Link>
                </div>
            </div>
        </>
    );
}
