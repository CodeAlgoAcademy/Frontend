import React from "react"
import { Sidebar, ScheduleBox, NoteBox, GeneralNav, SummaryBox } from "../components"

const Dashboard = () => {
	return (
		<div className='min-h-[100vh] flex flex-col'>
			<GeneralNav />
			<div className='flex items-stretch mb-auto grow'>
				<div className='sidebar bg-white w-[270px]'>
					<Sidebar />
				</div>
				<div className='bg-[#E5E5E5] flex-1 px-[6%] py-8'>
					<h2 className='text-[28px] font-bold mb-6' data-testid='dashboard-heading'>Today at a Glance</h2>
					<div className='flex gap-10 flex-wrap'>
						<SummaryBox />
						<div className='grid gap-6'>
							<ScheduleBox />
							<NoteBox />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Dashboard
