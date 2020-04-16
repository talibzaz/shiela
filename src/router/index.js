import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/dashboard'
import Home from '@/components/home'
import Login from '@/components/login'
import RequestList from '@/components/organiser/request-list'
import ProfileList from '@/components/organiser/profile-list'
import Profile from '@/components/organiser/profile'
import ApproveOrganiser from '@/components/organiser/approve-organiser'
import RejectOrganiser from '@/components/organiser/reject-organiser'
import EventList from '@/components/event/list/event-list'
import EventDetails from '@/components/event/list/event-details'
import Deactivate  from '@/components/event/list/deactivate'
import Categories from '@/components/event/categories/list'
import EditCategory from '@/components/event/categories/edit'
import AreaOfInterest from '@/components/event/area-of-interest/list'
import EditAreaOfInterest from '@/components/event/area-of-interest/edit'
import JobPosition from '@/components/event/job-position/list'
import EditJobPositions from '@/components/event/job-position/edit'
import EventType from '@/components/event/event-type/list'
import EditEventType from '@/components/event/event-type/edit'
import Payouts from '@/components/finance/payouts'
import UpcomingPayouts from '@/components/finance/upcoming-payouts'
import TicketList from '@/components/finance/ticket-list'
import OrderSales from '@/components/orders/order-sales'
import OrderDetails from '@/components/orders/order-details'
import Regions from '@/components/regions/list'
import EditRegion from '@/components/regions/edit'
import OrganiserList from '@/components/reports/organiser-list'
import AttendeeList from '@/components/reports/attendee-list'
import EventReports from '@/components/reports/event-reports'
import EventSpecificReport from '@/components/reports/event-specific-report'
import UserList from '@/components/user-list'
import OngoingEventList from '@/components/event/list/ongoing-event-list'
import EtCommission from '@/components/settings/et-commission'
import * as Storage from'../storage';

//chart imports

import VueChartkick from 'vue-chartkick'
import Chart from 'chart.js'

Vue.use(VueChartkick, {adapter: Chart})


Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/',
            component: Dashboard,
            beforeEnter(to, from, next) {
                if (Storage.getToken()) {
                    next();
                    return;
                }
                next({ path: '/login' });
            },
            children: [
                {
                    path: '/',
                    name: 'dashboard',
                    component: Home
                },

                {
                    path: 'organiser/request-list',
                    name: 'organiser/request-list',
                    component: RequestList
                },
                {
                    path: 'organiser/profile-list',
                    component: ProfileList ,
                },
                {
                    path: 'organiser/profile/:organiserID',
                    name: 'organiser/profile',
                    component: Profile ,
                    props: true
                },
                {
                    path: 'organiser/approve-organiser/:approveOrganiserID',
                    name: 'organiser/approve-organiser',
                    component: ApproveOrganiser ,
                    props: true
                },
                {
                    path: 'organiser/reject-organiser/:rejectOrganiserID',
                    name: 'organiser/reject-organiser',
                    component: RejectOrganiser ,
                    props: true
                },
                {
                    path: 'event/list/event-details/:eventID',
                    name: 'event/list/event-details',
                    component: EventDetails ,
                    props: true
                },

                {
                    path: 'event/list/event-list',
                    name: 'event/list/event-list',
                    component: EventList,
                },

                {
                    path: 'event/list/ongoing-event-list',
                    name: 'event/list/ongoing-event-list',
                    component: OngoingEventList
                },

                {
                    path: 'event/list/deactivate/:deactivateID',
                    name: 'event/list/deactivate',
                    component: Deactivate ,
                    props: true
                },
                {
                    path: 'event/categories/list',
                    component: Categories,
                    props: {
                        customUploadButton:true,
                        imageUpload:true,
                        setImageSize: true
                    },
                },
                {
                    path: 'event/categories/edit/:categoryID',
                    name: 'event/categories/edit',
                    component: EditCategory,
                    props: {
                        customUploadButton:true,
                        showCancel: true
                    },
                },
                {
                    path: 'event/area-of-interest/list',
                    name: 'event/area-of-interest/list',
                    component: AreaOfInterest,
                    props:true
                },
                {
                    path: 'event/area-of-interest/edit/:interestID',
                    name: 'event/area-of-interest/edit',
                    component: EditAreaOfInterest,
                    props: {
                        showCancel: true
                    }
                },
                {
                    path: 'event/job-position/list',
                    name: 'event/job-position/list',
                    component: JobPosition,
                },
                {
                    path: 'event/job-position/edit/:positionID',
                    name: 'event/job-position/edit',
                    component: EditJobPositions,
                    props: {
                        showCancel: true
                    }
                },
                {
                    path: 'event/event-type/list',
                    name: 'event/event-type/list',
                    component: EventType,
                },
                {
                    path: 'event/event-type/edit/:eventTypeID',
                    name: 'event/event-type/edit',
                    component: EditEventType,
                    props: {
                        showCancel: true
                    }
                },
                {
                    path: 'finance/payouts',
                    name: 'finance/payouts',
                    component: Payouts,
                },
                {
                    path: 'finance/upcoming-payouts',
                    component: UpcomingPayouts,
                },
                {
                    path: 'finance/ticket-list',
                    component: TicketList,
                },
                {
                    path: 'orders/order-sales/:eventID',
                    name:'orders/order-sales',
                    component: OrderSales,
                    props: true
                },
                {
                    path: 'orders/order-details/:salesID',
                    name:'orders/order-details',
                    component: OrderDetails,
                    props: true
                },
                {
                    path: 'regions/list',
                    component: Regions,
                },
                {
                    path: 'regions/edit/:regionID',
                    name: 'regions/edit',
                    component: EditRegion,
                    props :{
                        showCancel: true
                    }
                },
                {
                    path: 'reports/organiser-list',
                    component: OrganiserList,
                },
                {
                    path: 'reports/attendee-list',
                    component: AttendeeList,
                },
                {
                    path: 'reports/event-reports',
                    component: EventReports,
                },
                {
                    path: 'reports/event-specific-report/:eventID',
                    name: 'report/event-specific-report',
                    component: EventSpecificReport,
                    props:true
                },
                {
                    path: 'user-list',
                    component: UserList
                },
                {
                    path: 'settings/et-commission',
                    name: 'settings/et-commission',
                    component: EtCommission,
                    props: true
                }
            ]
        }
    ]
})
