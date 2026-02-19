"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";

export default function AdminPage() {
    const { user, isLoaded } = useUser();
    const router = useRouter();
    const amIAdmin = useQuery(api.users.amIAdmin);
    const users = useQuery(api.users.getUsers);
    const updateRole = useMutation(api.users.updateRole);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isLoaded) {
            if (!user) {
                router.push("/");
            } else if (amIAdmin !== undefined) {
                if (!amIAdmin) {
                    router.push("/");
                }
                setIsLoading(false);
            }
        }
    }, [isLoaded, user, amIAdmin, router]);

    if (isLoading || users === undefined) {
        return (
            <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
                Loading Admin Dashboard...
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#050505] text-white">
            <Navbar />
            <div className="container-custom pt-24 md:pt-32 pb-20">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 md:mb-12">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">Admin Dashboard</h1>
                        <p className="text-neutral-400">Manage users and roles.</p>
                    </div>
                    <div className="bg-neutral-900 px-4 py-2 rounded-lg border border-white/10 text-sm">
                        Total Users: <span className="font-bold text-white">{users.length}</span>
                    </div>
                </div>

                {/* Desktop table */}
                <div className="hidden md:block bg-neutral-900 border border-white/10 rounded-xl overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/10 bg-white/5">
                                <th className="p-4 font-medium text-neutral-400 text-sm uppercase tracking-wider">User</th>
                                <th className="p-4 font-medium text-neutral-400 text-sm uppercase tracking-wider">Email</th>
                                <th className="p-4 font-medium text-neutral-400 text-sm uppercase tracking-wider">Role</th>
                                <th className="p-4 font-medium text-neutral-400 text-sm uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {users.map((u) => (
                                <tr key={u._id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            {u.avatar ? (
                                                <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full" />
                                            ) : (
                                                <div className="w-8 h-8 rounded-full bg-neutral-800" />
                                            )}
                                            <span className="font-medium">{u.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-neutral-400 text-sm">{u.email || "No email"}</td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${u.role === "admin" ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" : "bg-neutral-800 text-neutral-400 border border-white/5"}`}>
                                            {u.role}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        {u.role === "admin" ? (
                                            <Button variant="outline" className="h-8 px-3 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 border-red-500/20" onClick={() => updateRole({ id: u._id, role: "user" })} disabled={u.tokenIdentifier === user?.id}>
                                                Demote
                                            </Button>
                                        ) : (
                                            <Button variant="outline" className="h-8 px-3 text-xs text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 border-purple-500/20" onClick={() => updateRole({ id: u._id, role: "admin" })}>
                                                Promote
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile card list */}
                <div className="md:hidden space-y-3">
                    {users.map((u) => (
                        <div key={u._id} className="bg-neutral-900 border border-white/10 rounded-xl p-4">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    {u.avatar ? (
                                        <img src={u.avatar} alt={u.name} className="w-9 h-9 rounded-full" />
                                    ) : (
                                        <div className="w-9 h-9 rounded-full bg-neutral-800" />
                                    )}
                                    <div>
                                        <div className="font-medium text-sm">{u.name}</div>
                                        <div className="text-xs text-neutral-500">{u.email || "No email"}</div>
                                    </div>
                                </div>
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${u.role === "admin" ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" : "bg-neutral-800 text-neutral-400 border border-white/5"}`}>
                                    {u.role}
                                </span>
                            </div>
                            <div className="flex justify-end">
                                {u.role === "admin" ? (
                                    <Button variant="outline" className="h-8 px-3 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 border-red-500/20" onClick={() => updateRole({ id: u._id, role: "user" })} disabled={u.tokenIdentifier === user?.id}>
                                        Demote
                                    </Button>
                                ) : (
                                    <Button variant="outline" className="h-8 px-3 text-xs text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 border-purple-500/20" onClick={() => updateRole({ id: u._id, role: "admin" })}>
                                        Promote
                                    </Button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
