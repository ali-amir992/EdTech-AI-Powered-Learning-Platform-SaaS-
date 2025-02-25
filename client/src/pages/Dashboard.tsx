import { BarChart3, BookOpen, GraduationCap, Users2 } from "lucide-react"
import type { DashboardStats, UserRole } from "@/data/dashboard-types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

const roleBasedStats: Record<UserRole, DashboardStats[]> = {
    student: [
        {
            title: "Active Courses",
            value: 3,
            description: "Currently enrolled courses",
            icon: BookOpen,
        },
        {
            title: "Assignments",
            value: 8,
            description: "2 due this week",
            icon: GraduationCap,
        },
        {
            title: "Overall Progress",
            value: "78%",
            description: "Across all courses",
            icon: BarChart3,
        },
    ],
    instructor: [
        {
            title: "Active Classes",
            value: 4,
            description: "Currently teaching",
            icon: BookOpen,
        },
        {
            title: "Total Students",
            value: 156,
            description: "Across all courses",
            icon: Users2,
        },
        {
            title: "Pending Grades",
            value: 23,
            description: "Needs review",
            icon: GraduationCap,
        },
    ],
    admin: [
        {
            title: "Total Users",
            value: 2459,
            description: "Active platform users",
            icon: Users2,
        },
        {
            title: "Active Courses",
            value: 48,
            description: "Across all departments",
            icon: BookOpen,
        },
        {
            title: "System Health",
            value: "99.9%",
            description: "Operational status",
            icon: BarChart3,
        },
    ],
}

export default function DashboardPage() {
    // In a real app, this would come from your auth context
    const userRole: UserRole = "admin"
    const stats = roleBasedStats[userRole]

    return (
        <DashboardLayout>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {stats.map((stat, index) => (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />

                        </CardHeader>

                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">{stat.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
                <Card className="col-span-full md:col-span-2">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[200px] rounded-lg bg-muted" />
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}

