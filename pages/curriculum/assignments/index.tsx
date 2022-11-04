import React from "react"
import { Button, Sidebar, GeneralNav } from "../../../components"
import { BsPlusCircle } from "react-icons/bs"
import { RiArrowDropDownLine } from "react-icons/ri"

const assignments = () => {
	return (
		<div className='min-h-[100vh] flex flex-col'>
			<GeneralNav />
			<div className='flex items-stretch mb-auto grow'>
				<div className='sidebar bg-white w-[270px]'>
					<Sidebar />
				</div>
				<div className='bg-[#E5E5E5] flex-1 px-[6%] py-8'>
					<div className='flex justify-between items-center'>
						<h2 className='text-[28px] font-bold mb-6' data-testid='curriculum-assignment-heading'>
							New Assignment
						</h2>
						<span className='hover:opacity-80 cursor-pointer flex items-center gap-3'>
							<span className='text-lg'>
								<BsPlusCircle />
							</span>
							<span className='text-lg font-semibold'>Assignment History</span>
						</span>
					</div>
					<div className=''>
						<input type='text' name='' id='' className='h-[44px] w-[400px] py-2 px-4 rounded-md outline-none' placeholder='Assignment Title' />
						<div className='pt-4 mt-4 border-t border-[#BDBDBD] flex flex-col gap-4'>
							<div className='rounded-md h-[58px] bg-white flex items-center overflow-y-hidden'>
								<div className='rounded-r-md flex items-center justify-between px-4 w-[180px] shadow-right h-full'>
									<span className='font-bold'>Skill(s)</span>
									<div className='text-[32px]'>
										<RiArrowDropDownLine />
									</div>
								</div>
								<div className='px-14'>
									<span className="font-medium">0 skill(s) selected</span>
								</div>
							</div>
							<div className='rounded-md h-[58px] bg-white flex items-center overflow-y-hidden'>
								<div className='rounded-r-md flex items-center justify-between px-4 w-[180px] shadow-right h-full'>
									<span className='font-bold'>Student(s)</span>
									<div className='text-[32px]'>
										<RiArrowDropDownLine />
									</div>
								</div>
								<div className='px-14'>
									<span className="font-medium">Selected Students</span>
								</div>
							</div>
							<div className='rounded-md h-[58px] bg-white flex items-center overflow-y-hidden'>
								<div className='rounded-r-md flex items-center justify-between px-4 w-[180px] shadow-right h-full'>
									<span className='font-bold'>Parameters</span>
									<div className='text-[32px]'>
										<RiArrowDropDownLine />
									</div>
								</div>
								<div className='px-14 flex items-center gap-8'>
									<span className="font-medium">Order of questions</span>
									<div className="flex items-center gap-14">
										<div className="form-check flex items-center gap-2">
											<input
												className="" type="radio" name="arrangementRadio" id="arrangementRadio1" />
											<label className="form-check-label inline-block text-gray-800 font-medium" htmlFor="arrangementRadio1">
												Random
											</label>
										</div>
										<div className="form-check flex items-center gap-2">
											<input className="" type="radio" name="arrangementRadio" id="arrangementRadio2" checked />
											<label className="form-check-label inline-block text-gray-800 font-medium" htmlFor="arrangementRadio2">
												Sequence
											</label>
										</div>
									</div>
								</div>
							</div>
							<div className='rounded-md h-[58px] bg-white flex items-center overflow-y-hidden'>
								<div className='rounded-r-md flex items-center justify-between px-4 w-[180px] shadow-right h-full'>
									<span className='font-bold'>Scheduling</span>
									<div className='text-[32px]'>
										<RiArrowDropDownLine />
									</div>
								</div>
								<div className='px-14'>
									<div className="flex items-center gap-14">
										<div className="form-check flex items-center gap-2">
											<input
												className="" type="radio" name="scheduleRadio" id="scheduleRadio1" />
											<label className="form-check-label inline-block text-gray-800 font-medium" htmlFor="scheduleRadio1">
												Start assignment now
											</label>
										</div>
										<div className="form-check flex items-center gap-2">
											<input className="" type="radio" name="scheduleRadio" id="scheduleRadio2" checked />
											<label className="form-check-label inline-block text-gray-800 font-medium" htmlFor="scheduleRadio2">
												Schedule for later date
											</label>
										</div>
									</div>
								</div>
							</div>
							<div className='flex flex-row-reverse gap-4 mt-4'>
								<Button color="#412281" text="Save" />
								<Button color="#412281" text="Create" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default assignments
