'use client';

import Image from 'next/image';
import { Heading } from '../components/ui/Heading';
import Link from 'next/link';
import { getAccessToken } from '@/actions/auth/getAccessToken';
import { useEffect, useState } from 'react';
import { dashboardAdmin } from '@/api/dashboard';
import { DashboardResponse } from '@/types/dashboard';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardResponse | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const { accessToken } = await getAccessToken();
      if (!accessToken) return;
      const data = await dashboardAdmin(accessToken);
      setDashboardData(data);
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="flex min-h-screen pl-[30rem] xl:pl-[36rem] pt-[6rem] xl:pt-[11.9rem]">
      <div className="h-[84.5rem] overflow-auto">
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-[2.2rem] w-fit">
          <div className="w-[33.9rem] h-[26.7rem] px-[2.9rem] py-[1.6rem]">
            <div className="flex items-center justify-between pb-[3rem]">
              <Heading tag="h1">구독현황</Heading>
              <Link href="/subscription-status">
                <Image src="icons/plus-circle.svg" alt="plus" width={24} height={24} />
              </Link>
            </div>
            <div className="space-y-[2.6rem]">
              <div className="flex justify-between items-center">
                <Heading tag="h2">전체 구독</Heading>
                <span className="font-bold text-[1.8rem]">
                  {dashboardData?.total_subscriptions}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <Heading tag="h2">신규 구독</Heading>
                <span className="font-bold text-[1.8rem]">
                  {dashboardData?.new_subscriptions_today}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <Heading tag="h2">오늘 구독 일시정지</Heading>
                <span className="font-bold text-[1.8rem]">
                  {dashboardData?.paused_subscriptions}
                </span>
              </div>
            </div>
          </div>

          <div className="w-[33.9rem] h-[26.7rem] px-[2.9rem] py-[1.6rem]">
            <div className="flex items-center justify-between pb-[3rem]">
              <Heading tag="h1">구독취소현황</Heading>
              <Link href="/subscription-cancel">
                <Image src="icons/plus-circle.svg" alt="plus" width={24} height={24} />
              </Link>
            </div>
            <div className="space-y-[2.6rem]">
              <div className="flex justify-between items-center">
                <Heading tag="h2">전체 취소</Heading>
                <span className="font-bold text-[1.8rem]">{dashboardData?.subs_cancel_all}</span>
              </div>
              <div className="flex justify-between items-center">
                <Heading tag="h2">오늘 취소</Heading>
                <span className="font-bold text-[1.8rem]">{dashboardData?.subs_cancel_today}</span>
              </div>
            </div>
          </div>

          <div className="w-[33.9rem] h-[26.7rem] px-[2.9rem] py-[1.6rem]">
            <div className="flex items-center justify-between pb-[3rem]">
              <Heading tag="h1">리뷰현황</Heading>
              <Link href="/review">
                <Image src="icons/plus-circle.svg" alt="plus" width={24} height={24} />
              </Link>
            </div>
            <div className="space-y-[2.6rem]">
              <div className="flex justify-between items-center">
                <Heading tag="h2">전체 리뷰</Heading>
                <span className="font-bold text-[1.8rem]">{dashboardData?.all_reviews}</span>
              </div>
              <div className="flex justify-between items-center">
                <Heading tag="h2">신규 리뷰</Heading>
                <span className="font-bold text-[1.8rem]">{dashboardData?.new_reviews}</span>
              </div>
            </div>
          </div>

          <div className="w-[33.9rem] h-[26.7rem] px-[2.9rem] py-[1.6rem]">
            <div className="flex items-center justify-between pb-[3rem]">
              <Heading tag="h1">고객현황</Heading>
              <Link href="/customer">
                <Image src="icons/plus-circle.svg" alt="plus" width={24} height={24} />
              </Link>
            </div>
            <div className="space-y-[2.6rem]">
              <div className="flex justify-between items-center">
                <Heading tag="h2">전체 고객 수</Heading>
                <span className="font-bold text-[1.8rem] text-[#e90000]">
                  {dashboardData?.total_customers}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <Heading tag="h2">오늘 가입</Heading>
                <span className="font-bold text-[1.8rem] text-[#e90000]">
                  {dashboardData?.new_customers_today}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <Heading tag="h2">오늘 탈퇴</Heading>
                <span className="font-bold text-[1.8rem]">
                  {dashboardData?.deleted_customers_today}
                </span>
              </div>
            </div>
          </div>

          <div className="px-[2.9rem] py-[1.6rem] col-span-full lg:col-span-2">
            <div className="flex items-center justify-between pb-[3rem]">
              <Heading tag="h1">매출현황</Heading>
              <Link href="/sales">
                <Image src="icons/plus-circle.svg" alt="plus" width={24} height={24} />
              </Link>
            </div>
            <div className="space-y-[2.6rem]">
              <div className="flex justify-between items-center">
                <Heading tag="h2">당월 매출</Heading>
                <span className="font-bold text-[1.8rem]">
                  {dashboardData?.monthly_sales.toLocaleString()}원
                </span>
              </div>
              <div className="flex justify-between items-center">
                <Heading tag="h2">당월 취소 매출</Heading>
                <span className="font-bold text-[1.8rem]">
                  -{dashboardData?.monthly_refunds.toLocaleString()}원
                </span>
              </div>
              <div className="flex justify-between items-center">
                <Heading tag="h2">당월 총매출</Heading>
                <span className="font-bold text-[1.8rem]">
                  {dashboardData?.monthly_total_sales.toLocaleString()}원
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
