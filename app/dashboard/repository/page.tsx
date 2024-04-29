import URL from "@/app/utils/constants/url/url";
import DashboardHeader from "../components/common/dashboard.header";
import DashboardLayout from '@/app/dashboard/components/common/dashboard.layout';
import MainRepositoryDashboard from "./MainRepository";

const CandidateRepository: React.FC<Props> = () => {

    const links = [
        { title: "Dashboard", link: URL.dashboard.root, isActive: false },
        { title: "Profile", link: URL.user.profile, isActive: false },
        { title: "Repository", link: URL.dashboard.repository, isActive: true }
    ];

    const HeaderOptions = () => (
        <div className="flex justify-end">
            <DashboardHeader links={links} />
        </div>
    )

    return (
        <>
            <DashboardLayout
                header={<HeaderOptions />}
                content={<MainRepositoryDashboard />} />
        </>
    );
}

export default CandidateRepository

interface Props {

}