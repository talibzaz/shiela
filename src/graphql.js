import gql from 'graphql-tag'

export const Mutation_createAreaOfInterest = gql`
    mutation Mutation_createAreaOfInterest($name: String!, $desc: String!) {
        createAreaOfInterest(
            name: $name,
            desc: $desc
        ) {
            status
            message
        }
    }`;

export const Mutation_createNewEventType = gql`
    mutation Mutation_createNewEventType($eventTypeName: String!, $desc: String!) {
        createNewEventType(
            eventTypeName: $eventTypeName,
            desc: $desc
        ) {
            status
            message
        }
    }`;

export const Mutation_createNewJobPosition = gql`
    mutation Mutation_createNewJobPosition($name: String!, $desc: String!) {
        createNewJobPosition(
            name: $name,
            desc: $desc
        ) {
            status
            message
        }
    }`;

export const Mutation_createNewRegion = gql`
    mutation Mutation_createNewRegion($name: String!) {
        createNewRegion(
            name: $name,
        ) {
            status
            message
        }
    }`;

export const Mutation_markAsPaidByEventId = gql`
    mutation Mutation_markAsPaidByEventId($eventId: String!) {
        markAsPaidByEventId(eventId: $eventId)
        {
            status
            message
        }
    }`;

export const Mutation_updateAreaOfInterest = gql`
    mutation Mutation_updateAreaOfInterest($id: Int!, $name: String!, $desc: String!) {
        updateAreaOfInterest(
            id: $id,
            name: $name,
            desc: $desc
        ){
            status
            message
        }
    }`;

export const Mutation_updateJobPositionById = gql`
    mutation Mutation_updateJobPositionById($id: Int!, $name: String!, $desc: String!){
        updateJobPositionById(
            id: $id,
            name: $name,
            desc: $desc
        ){
            status
            message
        }
    }`;

export const Mutation_updateEventType = gql`
    mutation Mutation_updateEventType($id: Int!, $eventTypeName: String!, $desc: String!){
        updateEventType(
            id: $id,
            eventTypeName: $eventTypeName,
            desc: $desc
        ){
            status
            message
        }
    }`;

export const Mutation_approveOrganizer = gql`
    mutation Mutation_approveOrganizer($id: String!, $organizer: String!, $email: String!){
        approveOrganizer(id: $id, organizer: $organizer, email: $email){
            status
            message
        }
    }`;

export const Mutation_rejectOrganizerByID = gql`
    mutation Mutation_rejectOrganizerByID($id: ID!, $reason: String!, $desc: String!){
        rejectOrganizerByID(
            id: $id,
            reason: $reason,
            desc: $desc
        ) {
            status
            message
        }
    }`;

export const Mutation_UpdateEventEtCommission = gql`
    mutation UpdateEventEtCommission($eventId: String!, $etCommission: Float!){
        updateEventEtCommission(
            eventId: $eventId,
            etCommission: $etCommission
        ){
            status
            message
        }
    }`;

export const Mutation_updateOrganizer = gql`
    mutation UpdateOrganizer($description: String!, $website: String!, $agreement_uid: String!, $o_id: String!, $fname: String!, $lname: String!, $salutation: String!, $mobile: String!, $blogUrl: String!, $user_id: String!, $etCommission: Float!, $etNotes: String!){
        updateOrganizer(
            description: $description,
            website: $website,
            agreement_uid: $agreement_uid,
            o_id: $o_id,
            fname: $fname,
            lname: $lname,
            salutation: $salutation,
            mobile: $mobile,
            blogUrl: $blogUrl,
            user_id: $user_id,
            etCommission: $etCommission,
            etNotes: $etNotes
            ){
            status
            message
        }
    }`;

export const Mutation_updateRegionByID = gql `
    mutation updateRegionByID($id: Int!, $name:String!){
        updateRegionByID(
            id: $id,
            name: $name
        ){
            status
            message
        }
    }`;

export const Mutation_UpdateGlobalEtCommissionRate = gql`
    mutation UpdateGlobalEtCommissionRate($etCommission: Float!){
        updateGlobalEtCommissionRate(etCommission: $etCommission) {
            status
            message
        }
    }`;

export const Mutation_ActivateEventByID = gql`
    mutation ActivateEventByID($eventID: String!){
        activateEventByID(eventID: $eventID) {
            status
            message
        }
    }`;

export const Mutation_ChangeOrganizersStatus = gql`
    mutation ChangeOrganizersStatus($organizerId: String!, $status:Int!, $value: Boolean!){
        changeOrganizersStatus(organizerId: $organizerId, status: $status, value: $value) {
            status
            message
        }
    }`;

export const Mutation_DeactivateEventByID = gql`
    mutation DeactivateEventByID($eventID: String!){
        deactivateEventByID(eventID: $eventID) {
            status
            message
        }
    }`;

export const Query_listPositions = gql`
    query Query_listPositions($offset: Int!){
        listPositions(offset: $offset) {
            id
            name
            noOfEvents
        }
    }`;

export const Query_organizerProfileList = gql`
    query Query_organizerProfileList($status: String!, $offset: Int!){
        organizerProfileList(status: $status, offset: $offset) {
            id
            name
            website
            userFirstName
            status
        }
    }`;
export const Query_getApprovedOrganizersList = gql`
    query Query_getApprovedOrganizersList {
        getApprovedOrganizersList {
            id
            name
        }
    }`;

export const Query_listOfInterests = gql`
    query Query_listOfInterests($offset: Int!) {
        listOfInterests(offset: $offset){
            id
            name
            noOfEvents
        }
    }`;

export const Query_listEventTypes = gql`
    query Query_listEventTypes($offset: Int!) {
        listEventTypes(offset: $offset){
            id
            name
            noOfEvents
        }
    }`;

export const Query_listRegions = gql`
    query Query_listRegions($offset: Int!) {
        listRegions(offset: $offset){
            id
            name
            noOfEvents
        }
    }`;

export const Query_getPayoutDetails = gql`
    query Query_getPayoutDetails($offset: Int!) {
        getPayoutDetails(offset: $offset) {
            id
            name
            endDate
            sold
            totalSaleAmount
            totalEtShare
            totalTaxAmount
            totalPayoutAmount
            status
        }
    }`;

export const Query_UpcomingPayouts = gql`
    query Query_UpcomingPayouts($offset: Int!, $limit: Int!){
        upcomingPayouts(offset: $offset, limit: $limit) {
            id
            name
            endDate
            payoutAmount
        }
    }`;

export const Query_getUserList = gql`
    query Query_getUserList($offset: Int!) {
        getUserList(offset: $offset){
            userName
            email
            organization
            location
            isOrganizer
        }
    }`;

export const Query_getInterestByID = gql`
        query Query_getInterestByID($id: Int!) {
            getInterestByID(id: $id) {
                name
                description
            }
        }`;

export const Query_getPositionByID = gql`
    query Query_getPositionByID($id: Int!){
        getPositionByID(id: $id){
            name
            description
        }
    }`;

export const Query_getEventTypeById = gql`
    query Query_getEventTypeById($id: Int!){
        getEventTypeById(id: $id){
            name
            description
        }
    }`;

export const Query_getOrganizerByID = gql`
    query Query_getOrganizerByID($id: ID!){
        getOrganizerByID(id: $id){
            organizerProfile {
                name
                description
                website
                uploadId
                isActive
                etCommission
                etNotes
            }
            userProfile {
                userId
                userName
                salutation
                mobileNumber
                email
            }
            uploadId
            agreementId
        }
    }`;

export const Query_getOrganizersEventList = gql`
    query Query_getOrganizersEventList($id: ID!, $offset: Int!){
        getOrganizersEventList(id: $id, offset: $offset){
            name
            startDate
            venueCity
            status
        }
    }`;

export const Query_reportsEventList = gql `
    query Query_reportsEventList($id: String!){
        reportsEventList(id: $id){
            id
            name
        }
    }`;

export const Query_getOrganizersReport = gql `
    query Query_getOrganizersReport($offset: Int!){
        getOrganizersReport(offset: $offset){
            id
            name
            eventsCount
            revenueGenerated
            totalEtEarning
        }
    }`;

export const Query_getEventAttendees = gql`
    query Query_getEventAttendees($eventId: String!, $organizerId: String!, $offset: Int!){
        getEventAttendees(eventId: $eventId, organizerId: $organizerId, offset: $offset){
            attendee
            eventName
            organizerName
        }
    }`;

export const Query_getRegionByID = gql`
    query getRegionByID($id: Int!){
        getRegionByID(id: $id){
            name
        }
    }`;

export const Query_getUserProfilesCount = gql`
    query getUserProfilesCount {
        getUserProfilesCount
    }`;

export const Query_getOrganizerProfilesCount = gql`
    query getOrganizerProfilesCount {
        getOrganizerProfilesCount
    }`;

export const Query_getTotalEventsCreated = gql`
     query getTotalEventsCreated {
        getTotalEventsCreated
     }`;

export const Query_getRecentEvents = gql `
    query getRecentEvents {
        getRecentEvents {
            name
            organizerName
            startDate
        }
    }`;

export const Query_exhibitorEnquiriesCount = gql`
    query exhibitorEnquiriesCount($eventID: String!) {
        exhibitorEnquiriesCount(eventID: $eventID)
    }`;

export const Query_sponsorEnquiriesCount = gql`
    query sponsorEnquiriesCount($eventID: String!) {
        sponsorEnquiriesCount(eventID: $eventID)
    }`;

export const Query_totalBrochureRequests = gql`
    query totalBrochureRequests($eventID: String!) {
        totalBrochureRequests(eventID: $eventID)
    }`;

export const Query_GetGlobalEtCommissionRate = gql`
    query GetGlobalEtCommissionRate {
        getGlobalEtCommissionRate
    }`;

export const Query_GetEventPageHitsByID = gql`
    query GetEventPageHitsByID ($eventId: String!) {
        getEventPageHitsByID(eventId: $eventId)
    }`;

export const Query_TotalEtEarnings = gql`
    query {
        totalEtEarnings
    }`;
export const GET_ALL_EVENTS_QUERY = gql`
     query Query_getEventList($offset: Int!){
         getEventList(offset: $offset){
             id
             startDate
             name
             organizerName
             userName
             status
             ticketsSold
             isFeatured
         }
    }`;

export const GET_ONGOING_EVENTS_QUERY = gql`
     query Query_getOngoingEvents($offset: Int!){
         getOngoingEvents(offset: $offset){
             id
             startDate
             name
             organizerName
             userName
             status
         }
    }`;

export const GET_ALL_CATEGORIES_QUERY = gql`
    query Query_getCategories($offset: Int!){
        getCategories(offset: $offset){
            id
            name
            noOfEvents
        }
    }`;
export const LOGIN_QUERY = gql`
    query Query_login($email: String!, $password: String!){
        login(email: $email, password: $password){
            status
            message
        }
    }`;
export const CREATE_CATEGORY_MUTATION = gql`
    mutation Mutation_createCategory($name: String!, $description: String!, $imageSize: String!, $imageData: String!){
        createCategory(name: $name, description: $description, imageSize: $imageSize, imageData: $imageData){
            status
            message
        }
    }`;
export const GET_TICKET_LIST_QUERY = gql`
    query Query_getTicketList($offset: Int!){
        getTicketList(offset: $offset){
            eventId
            orderNo
            noOfTickets
            eventName
            purchasedBy
        }
    }`;
export const GET_EVENT_BY_ID_QUERY = gql`
    query Query_getEventById($id: ID!){
        getEventById(id: $id){
            name
            publishDate
            soldAmount
            ticketsSold
            imageData
            location
            startTime
            startDate
            endDate
            endTime
            categories
            types
            description
            isFeatured
            deactivated
            currency
        }
    }`;

export const GET_CATEGORY_BY_ID_QUERY = gql`
    query Query_getCategoryById($id: ID!){
        getCategoryById(id: $id){
            name
            description
            imageSize
            imageData
        }
    }`;

export const EDIT_CATEGORY_MUTATION = gql`
    mutation Mutation_editCategory($id: ID!, $newName: String!, $newDescription: String!, $imageSize: String!, $imageData: String!){
        editCategory(id: $id, newName: $newName, newDescription: $newDescription, imageSize: $imageSize, imageData: $imageData){
            status
            message
        }
    }`;

export const UPDATE_FEATURED_EVENT_MUTATION = gql`
    mutation Mutation_updateFeaturedEvent($id: ID!, $feature: Boolean!){
        updateFeaturedEvent(id: $id, feature: $feature){
            status
            message
        }
    }`;

export const TOTAL_REVENUE_GENERATED = gql`
    query {
        totalRevenueGenerated
    }`;

export const GET_TOP_EVENTS_QUERY = gql`
    query getTopEvents($duration: String!) {
        getTopEvents(duration: $duration) {
            id
            startDate
            name
            revenue
            ticketsSold
            location
        }
    }`;

export const GET_EVENT_OVERVIEW_QUERY = gql`
    query {
        getEventsOverview{
            totalRevenue
            eventsHeld
            ticketsSold
        }
    }`;

export const GET_EVENT_SPECIFIC_REPORT_QUERY = gql`
    query Query_getEventSpecificReport($id: ID!){
        getEventSpecificReport(id: $id){
            name
            ticketLiveDays
            ticketsSold
            publishDate
            totalRevenue
        }
    }
`
