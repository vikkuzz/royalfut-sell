/* eslint-disable max-lines */

// import { Fragment } from "react";
import { getTranslations, getLocale } from "next-intl/server";
import { ContentWithAsideLayout, Prose } from "@royalfut/ui";
import { CoinTransactionPromptCard } from "../../../../src";
import { HOST_URL } from "@royalfut/collections";

import styles from "./TermsContent.module.scss";

// type TMappingMail = {
//     type: "mail",
//     href: string;
// }

// type TMappingList = string | TMappingMail | {
//     title: string;
//     view: "numerical" | "bulleted";
//     type: "list";
//     isIncremental: boolean;
//     items: Array<TMappingItems>;
// }

// type TMappingItems = Array<TMappingList>;

// const mapping = (items: Array<any>) => {
//     return (
//         <Prose.List numerical>
//             {items.map((item, idx) => {
//                 if (Array.isArray(item)) {
//                     return (
//                         <Prose.ListItem key={idx}>
//                             {item.map((subItem, subIdx) => {
//                                 if (typeof subItem === "string") {
//                                     return <Fragment key={subIdx}>{subItem}</Fragment>;
//                                 } else if (typeof subItem === "object" && subItem.type === "mail") {
//                                     return (
//                                         <Prose.MailTo key={subIdx} to={subItem.href} />
//                                     );
//                                 }

//                                 return null;
//                             })}
//                         </Prose.ListItem>
//                     );
//                 }

//                 return (
//                     <Prose.ListItem key={idx}>
//                         {item}
//                     </Prose.ListItem>
//                 )
//             })}
//         </Prose.List>
//     );
// }

const Page = async () => {
    const [locale, t] = await Promise.all([
        getLocale(),
        getTranslations("quinn_pages.terms"),
    ]);
    const terms = (await import(`./lngs/${locale}.js`)).default as Array<any>;

    return (
        <ContentWithAsideLayout.Root>
            <ContentWithAsideLayout.Header title={t("h1")} />
            <ContentWithAsideLayout.Body>
                <ContentWithAsideLayout.Content className="prose">
                    <Prose.Paragraph>
                        {t("p.1.1")}{" "}
                        <Prose.Anchor href={HOST_URL} target="_blank">
                            https://royalfut.com
                        </Prose.Anchor>
                        {t("p.1.2")}
                    </Prose.Paragraph>
                    <Prose id="user-agreement">{t("h2.1")}</Prose>
                    {terms.map((el, i) => {
                        if (i === 1) {
                            return (
                                <noindex key={i}>
                                    <p
                                        className={`${styles.p_text} ${styles.p_padding}`}>
                                        {el.p}
                                    </p>
                                </noindex>
                            );
                        } else
                            return (
                                <p
                                    className={`${styles.p_text} ${styles.p_padding}`}
                                    key={i}>
                                    {el.p}
                                </p>
                            );
                    })}
                    {/* <Prose.Paragraph>{terms.head.p1}</Prose.Paragraph>
                    <Prose.Paragraph>{terms.head.p2}</Prose.Paragraph>
                    <Prose.Paragraph>{terms.head.p3}</Prose.Paragraph>
                    {mapping(terms.body)}

                    <Prose.List className="incremental" numerical>
                        <Prose.ListItem>
                            {terms.intro.title}
                            {mapping(terms.intro.items)}
                        </Prose.ListItem>
                    </Prose.List>
                       
                        <Prose.ListItem>
                            Definitions
                            <Prose.List numerical>
                                <Prose.ListItem>
                                    Personal data — any information related to
                                    an identified or identifiable individual.
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    ROYALFUT Content — the data, text, images,
                                    videos, catalogs, databases or offers
                                    available on or through the Website
                                    hereinafter reffered to as «ROYALFUT
                                    Content.»
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    Registered User — each user who completes
                                    the registration form on the Website
                                    providing information about themselves (for
                                    example, name, address, phone number, fax
                                    number, email, etc) becomes a registered
                                    user («Registered User») of ROYALFUT.
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    Operational Risks — the risks that users
                                    assume when using the Website or carrying
                                    out transactions are considered
                                    «transactional risks.» Operational Risks
                                    include liability risks or risks of damage
                                    of any kind in connection with the use of
                                    the Website. These risks include but are not
                                    limited to:
                                    <Prose.List>
                                        <Prose.ListItem>
                                            distorted information of products
                                            and services, fraud schemes,
                                            unsatisfactory quality, technical
                                            requirement discrepancies, defective
                                            or dangerous products, illegal
                                            products, delay or failure to meet
                                            terms of delivery or payment,
                                            miscalculations in value, breach of
                                            warranty and breach of contract.
                                        </Prose.ListItem>
                                        <Prose.ListItem>
                                            risks that the production, import,
                                            distribution, offer, demonstration,
                                            purchase, sale and/or use of
                                            products or services offered or
                                            displayed on the Website may violate
                                            or may be claimed as infringing the
                                            rights of third parties, as well as
                                            the risk that users may incur
                                            expenses for their defense or other
                                            costs in connection with the
                                            assertion of the rights of third
                                            parties by third parties or in
                                            connection with any claims by any
                                            party that they are entitled to
                                            defense or damages in connection
                                            with the assertion of the rights,
                                            claims or demands of third parties
                                        </Prose.ListItem>
                                        <Prose.ListItem>
                                            risks that consumers, other buyers,
                                            end users of products or other
                                            persons who claim to have suffered
                                            damages or harm related to a product
                                            originally obtained by users of the
                                            Website as a result of the sale and
                                            purchase transactions in connection
                                            with the use of the Website may
                                            suffer damages and/or file claims
                                            arising from their use of such
                                            products
                                        </Prose.ListItem>
                                    </Prose.List>
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    «User» — any person who accesses the Website
                                    for any purpose regardless of whether the
                                    User has registered on the Website as a
                                    registered user.
                                </Prose.ListItem>
                            </Prose.List>
                        </Prose.ListItem> */}
                    {/* 
                        <Prose.ListItem>
                            Use of ROYALFUT
                            <Prose.List numerical>
                                <Prose.ListItem>
                                    General provisions. Users can use the
                                    Website solely for their own personal
                                    purposes. Each User agrees that they cannot
                                    copy, reproduce or download any website
                                    content for the purpose of reselling or
                                    redistributing ROYALFUT content, mass
                                    mailing (email, wireless text messaging,
                                    physical mail or otherwise), conducting
                                    business that competes with ROYALFUT, or
                                    other commercial use of ROYALFUT content.
                                    The systematic search of ROYALFUT content
                                    from the Website to create or compile,
                                    directly or indirectly, a collection,
                                    compilation, database or catalog (whether by
                                    automated or manual means) without
                                    ROYALFUT’s written permission is prohibited.
                                    In addition, Users are prohibited from using
                                    ROYALFUT content for any purpose not
                                    expressly permitted by this Agreement.
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    The user agrees to receive messages from
                                    ROYALFUT via the email specified in their
                                    ROYALFUT account, or specified when paying
                                    in a ROYALFUT partner payment system, or via
                                    any method of communication specified as a
                                    method of communication on the site, through
                                    it or through any social media platforms,
                                    instant messengers or online chat messages
                                    found by the user on the site. The User
                                    hereby agrees that ROYALFUT can use the
                                    personal data of the User in private
                                    correspondence with the user or for mass
                                    messaging.
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    Messages or any other information sent by
                                    the User through communication systems
                                    provided by ROYALFUT, as well as emails, fax
                                    messages, letters, messages via messenger
                                    platforms, social media or instant messages
                                    of online chats sent to the email addresses
                                    from the information obtained from the
                                    Website cannot contain any material
                                    described in Clause 5.3, and moreover must
                                    be factual and true and not contain any
                                    intentional gaps or changes.
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    No User should take any action to undermine
                                    the integrity of the computer systems or
                                    networks used by ROYALFUT or any other user,
                                    and no user should attempt to gain
                                    unauthorized access to such computer systems
                                    or networks.
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    Any personal data received by ROYALFUT will
                                    be processed according to the Agreement.
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    ROYALFUT uses essential cookies for the
                                    Website to function. Cookies are small text
                                    files placed on your device (such as a
                                    computer, smartphone, or other electronic
                                    device) when you use the Website. Essential
                                    cookies provide basic functionality, such as
                                    security, network management, and
                                    accessibility. You can disable them by
                                    changing your browser settings, but this may
                                    affect website functionality.
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    ROYALFUT has the right to collect, use,
                                    store and process advertising cookies.
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    As a condition of access and use of the
                                    Website, Users agree not to use ROYALFUT
                                    services to violate the rights of third
                                    parties in any way. In the event of a
                                    violation, ROYALFUT has the right to
                                    terminate User accounts.
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    During registration on the Website, ROYALFUT
                                    may send an automatically generated password
                                    to the User. The User, by providing
                                    information about their contact address (for
                                    example, email), agrees that such
                                    information is verifiable, accurate, correct
                                    and full, and confirms and guarantees this
                                    fact. By providing a contact address, the
                                    User agrees to receive a message with a
                                    password from ROYALFUT according to Clause
                                    3.2. The User agrees that the password does
                                    not guarantee the full safety of their
                                    account from unauthorized access on the
                                    Website, and therefore, to provide the
                                    maximum protection of the account, the
                                    password should be changed before the first
                                    login attempt.
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    ROYALFUT reserves the right to terminate any
                                    User account if ROYALFUT believes the
                                    User&apos;s behavior is detrimental to the
                                    interests of ROYALFUT, its employees,
                                    directors, affiliates or other users, or for
                                    any other reason at ROYALFUT&apos;s sole and
                                    absolute discretion, with or without reason.
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    ROYALFUT may provide links to external sites
                                    that may be involved in the sale of products
                                    and services. ROYALFUT is not responsible
                                    for reviewing and evaluating websites, and
                                    does not control the content of websites or
                                    decisions made by third parties. ROYALFUT is
                                    not responsible for any actions of these
                                    websites against you.
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    The User agrees that the seller must deliver
                                    the order in 3 days from the moment all
                                    necessary data was provided by the User for
                                    the Comfort delivery method (email,
                                    password, EA account backup code) regardless
                                    of the price of the order.
                                </Prose.ListItem>
                            </Prose.List>
                        </Prose.ListItem>
                        <Prose.ListItem>
                            Registered User
                            <Prose.List numerical>
                                <Prose.ListItem>
                                    By becoming a Registered User, you agree to
                                    the collection, processing, storage and
                                    transfer of your personal data. You also
                                    agree that your personal data will be
                                    included in our database, and allow ROYALFUT
                                    to share such information with other Users
                                    in accordance with the purposes set forth in
                                    the Agreement.
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    ROYALFUT may reject registration and refuse
                                    to issue an account and associated username
                                    and password to any User for any reason, or
                                    no reason at all.
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    ROYALFUT can suspend or terminate a
                                    registered User&apos;s account at any time
                                    if:
                                    <Prose.List>
                                        <Prose.ListItem>
                                            by the sole and absolute
                                            determination of ROYALFUT, there was
                                            any violation of the provisions of
                                            this Agreement by the Registered
                                            User; or
                                        </Prose.ListItem>
                                        <Prose.ListItem>
                                            ROYALFUT has reasonable grounds to
                                            suspect that the information
                                            provided by the Registered User is
                                            untrue, inaccurate, or not
                                            up-to-date or complete; or
                                        </Prose.ListItem>
                                        <Prose.ListItem>
                                            ROYALFUT believes that the
                                            User&apos;s behavior is detrimental
                                            to the interests of ROYALFUT, its
                                            employees, directors, affiliates or
                                            other Users; or
                                        </Prose.ListItem>
                                        <Prose.ListItem>
                                            for any other reason or no reason at
                                            all, at the sole and absolute
                                            discretion of ROYALFUT
                                        </Prose.ListItem>
                                    </Prose.List>
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    A Registered User may not sell, attempt to
                                    sell, offer to sell, give, assign or
                                    otherwise transfer an account, username or
                                    password to third parties without
                                    ROYALFUT&apos;s prior written consent.
                                    ROYALFUT can suspend or terminate the
                                    Registered User&apos;s account or the
                                    recipient of the Registered User&apos;s in
                                    the event of the sale, offer of sale, gift,
                                    assignment or transfer in violation of the
                                    terms of this section.
                                </Prose.ListItem>
                            </Prose.List>
                        </Prose.ListItem>
                        <Prose.ListItem>
                            Posting on ROYALFUT
                            <Prose.List numerical>
                                <Prose.ListItem>
                                    No trading agency relationship emerges
                                    between any User and ROYALFUT, its
                                    affiliates, directors, officers or employees
                                    on the basis of ROYALFUT displaying any User
                                    information on the Website.
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    Every User understands, guarantees and
                                    agrees that:
                                    <Prose.List>
                                        <Prose.ListItem>
                                            any information provided by the User
                                            to the Website is true, accurate,
                                            up-to-date and full; and
                                        </Prose.ListItem>
                                        <Prose.ListItem>
                                            the User will support and quickly
                                            change the information so it is
                                            true, accurate, up-to-date and full
                                        </Prose.ListItem>
                                    </Prose.List>
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    Every User declares, guarantees and agrees
                                    that the information provided to ROYALFUT
                                    for provision on the Website must not:
                                    <Prose.List
                                        numerical
                                        type="a"
                                        className="standart">
                                        <Prose.ListItem>
                                            include any fraudulent information
                                            or offer/advertise any fraudulent
                                            goods, or be connected with the
                                            selling or attempt to sell imitation
                                            or stolen goods or goods that are
                                            legally prohibited for marketing
                                            and/or selling, or in any other way
                                            facilitating illegal activity
                                        </Prose.ListItem>
                                        <Prose.ListItem>
                                            be a part of a fraud scheme for
                                            other Users of the Website or any
                                            other illegal purposes
                                        </Prose.ListItem>
                                        <Prose.ListItem>
                                            be a part of the marketing of
                                            products or services that infringe
                                            or in any way contribute to or
                                            encourage the infringement of the
                                            rights of third parties
                                        </Prose.ListItem>
                                        <Prose.ListItem>
                                            violate any applicable laws,
                                            statutes, ordinances or regulations
                                            (including but not limited to
                                            regulating export control, consumer
                                            protection, unfair competition,
                                            anti-discrimination or false
                                            advertising)
                                        </Prose.ListItem>
                                        <Prose.ListItem>
                                            be disreputable, slanderous,
                                            illegally threatening or illegally
                                            prosecuting
                                        </Prose.ListItem>
                                        <Prose.ListItem>
                                            be obscene, contain or promote
                                            pornography of any kind or be
                                            related to pornographic materials,
                                            merchandise or any other content
                                            that in any way promotes sexually
                                            explicit material or is in any way
                                            harmful to minors
                                        </Prose.ListItem>
                                        <Prose.ListItem>
                                            promote discrimination based on
                                            race, gender, religion, nationality,
                                            disability, sexual orientation or
                                            age
                                        </Prose.ListItem>
                                        <Prose.ListItem>
                                            contain any material considered
                                            unauthorized advertising or spam
                                        </Prose.ListItem>
                                        <Prose.ListItem>
                                            request offers from any user related
                                            to business activities. Also, in the
                                            event that ROYALFUT discovers that
                                            the User violated this Clause 5.3
                                            (i), the User authorizes ROYALFUT to
                                            charge a penalty up to €150.00 using
                                            the registered method of payment of
                                            the User in the file and/or demand a
                                            deposit up to €300.00 for the
                                            activation of the User&apos;s
                                            account
                                        </Prose.ListItem>
                                        <Prose.ListItem>
                                            contain any computer viruses,
                                            Trojans or any other destructive
                                            programs, codes, links and web
                                            interfaces that can harm or disrupt
                                            software or hardware systems, or
                                            take over/expropriate any software
                                            or hardware systems, data or
                                            personal data
                                        </Prose.ListItem>
                                        <Prose.ListItem>
                                            refer directly or indirectly to the
                                            description of goods and services
                                            prohibited by this Agreement, or
                                            including their description; or
                                        </Prose.ListItem>
                                        <Prose.ListItem>
                                            otherwise, it should not create any
                                            responsibility for ROYALFUT, its
                                            employees, directors or affiliates
                                        </Prose.ListItem>
                                    </Prose.List>
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    Every User declares, guarantees and accepts
                                    that the User obtained all the necessary
                                    third party copyrights, trademarks, trade
                                    secrets or patent licenses and permits, and
                                    other licenses and permits that may be
                                    needed in accordance with any other personal
                                    and property rights of any third party
                                    (including but not limited to personality
                                    rights and rights to privacy), for any
                                    materials and information that the User
                                    posts on the Website and provides ROYALFUT
                                    with, or permits ROYALFUT to display or
                                    store. Every User declares, guarantees and
                                    accepts that the User is solely responsible
                                    for ensuring that any materials and data
                                    that the User displays on the Website and
                                    provides ROYALFUT with and permits ROYALFUT
                                    to display and store do not violate any
                                    rights of third parties or were displayed
                                    with the consent of the owner (owners) of
                                    such rights. Every User declares, guarantees
                                    and accepts that the User has the right to
                                    produce, offer, sell, import and distribute
                                    products that the User offers and displays
                                    on the Website, and that such production,
                                    offer, selling, import and/or distribution
                                    does not violate any rights of third
                                    parties.
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    Every User grants an irrevocable, perpetual,
                                    worldwide and royalty-free, sub-licensable
                                    (through multiple levels) and assignable
                                    license to ROYALFUT and its affiliates to
                                    display and use all the data provided by
                                    such User in accordance with the goals
                                    stated in the Agreement, and the license for
                                    the execution of rights that you hold in
                                    relation to such materials and data,
                                    including but not limited to copyright,
                                    publicity and database rights, in any media
                                    currently known or unknown.
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    ROYALFUT has the absolute right to display
                                    data about a User&apos;s order publicly on
                                    the Website (order time, time passed from
                                    the start of the order, time passed from the
                                    end of the order, including the costs of
                                    automatic posting (15 minutes), the platform
                                    and amount of coins in the order), hiding
                                    the User&apos;s email up to 7 visible
                                    symbols to comply with Confidentiality.
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    ROYALFUT reserves the right to remove
                                    according to its sole and absolute
                                    discretion any material posted on the
                                    Website including content that is, according
                                    to its opinion, illegal, may invoke
                                    liability for ROYALFUT, violate this
                                    Agreement, or is deemed inappropriate in any
                                    other way.
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    ROYALFUT reserves the right to cooperate
                                    with government agencies, private
                                    investigators and/or injured third parties
                                    in the investigation of any suspected
                                    criminal or civil wrongs. In addition,
                                    ROYALFUT may disclose the identity and
                                    contact information of any user if requested
                                    by a state or law enforcement agency,
                                    injured third party, subpoena or any other
                                    legal action, and ROYALFUT is not
                                    responsible for damages or any other
                                    consequences of such disclosure. The User
                                    also agrees not to make any claims against
                                    ROYALFUT for such disclosure. As regards any
                                    of the information stated above, ROYALFUT
                                    may suspend or terminate any User&apos;s
                                    account if ROYALFUT deems such action
                                    appropriate at its sole and absolute
                                    discretion. The User agrees that ROYALFUT
                                    does not bear any responsibility to the
                                    User, including responsibility for
                                    consequential or any other damages, in the
                                    event that ROYALFUT commits any of the
                                    actions mentioned in this section, and the
                                    User agrees to bear the risk of ROYALFUT
                                    being able to take such actions.
                                </Prose.ListItem>
                            </Prose.List>
                        </Prose.ListItem>
                        <Prose.ListItem>
                            Transactions between buyers and sellers
                            <Prose.List numerical>
                                <Prose.ListItem>
                                    ROYALFUT provides an electronic web platform
                                    for the exchange of information between
                                    buyers («buyer») and sellers («seller») of
                                    goods and services.
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    The Users bear full responsibility for any
                                    terms and conditions of transactions on the
                                    Website, through it or as a result of using
                                    it, including but not limited to terms of
                                    payment, returns, guarantees, delivery,
                                    insurance, fees, taxes, ownership, licenses,
                                    fines/penalties, permits, handling,
                                    transportation and storage.
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    The Users bear full responsibility for any
                                    terms and conditions of transactions on the
                                    Website, through it or as a result of using
                                    it, including but not limited to terms of
                                    payment, returns, guarantees, delivery,
                                    insurance, fees, taxes, ownership, licenses,
                                    fines/penalties, permits, handling,
                                    transportation and storage.
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    In the event that the transfer of goods and
                                    funds to all Users within a single
                                    transaction is carried out through a
                                    ROYALFUT representative, users can maintain
                                    their anonymity, and the safety of returning
                                    the Goods and/or payment of funds is
                                    Guaranteed.
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    Every User agrees that the User fully
                                    understands all risks of transactions when
                                    using the Website to conduct transactions,
                                    and that the User fully assumes the risks of
                                    liability or damage of any kind in
                                    connection with the use of the Website.
                                    Every User agrees that ROYALFUT is not
                                    responsible for any loss, liability,
                                    expense, harm, inconvenience, disruption or
                                    expense of any kind that may arise from or
                                    in connection with any transaction risks.
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    Users must pay all taxes for sales and use,
                                    and all other taxes arising from their use
                                    of the Website on their own.
                                </Prose.ListItem>
                            </Prose.List>
                        </Prose.ListItem>
                        <Prose.ListItem>
                            Payment
                            <Prose.List numerical>
                                <Prose.ListItem>
                                    The payment that ROYALFUT charges for the
                                    use of its services is no more than 50% of
                                    the amount of the paid order, depending on
                                    supplier offers.
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    Users must be able to pay ROYALFUT fees and
                                    all other fees and applicable taxes
                                    associated with services provided by the due
                                    date.
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    Transactions between buyers and sellers on
                                    the Website can be carried out with a promo
                                    code (coupon) or by clicking on an affiliate
                                    link. Each affiliate receives a fixed
                                    percentage of each transaction made on the
                                    Website via an affiliate link or with
                                    specification of a promo code (coupon).
                                </Prose.ListItem>
                            </Prose.List>
                        </Prose.ListItem>
                        <Prose.ListItem>
                            Disputes between users
                            <Prose.List numerical>
                                <Prose.ListItem>
                                    In the event of any disputes arising between
                                    Users regarding transactions on the site,
                                    the User agrees to submit the dispute to
                                    ROYALFUT as an arbiter for a final and
                                    binding decision. To allow ROYALFUT to
                                    conduct its investigations fairly and
                                    reasonably, Users agree to refrain from
                                    seeking arbitration while the order is still
                                    open or pending. Users seeking the
                                    intervention of third parties (with the
                                    exception of state investigative
                                    authorities) will be treated as follows:
                                    their actions will be regarded as an
                                    interference to the investigation process
                                    and an attempt to impose a decision in their
                                    favor. ROYALFUT reserves the right to
                                    suspend or permanently ban Users who attempt
                                    to interfere with standard operating
                                    procedures for orders that are still active
                                    or pending.
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    If the seller has to reimburse the buyer or
                                    ROYALFUT, then the seller authorizes
                                    ROYALFUT to remove the reimbursed amount (in
                                    the same or different currency) from their
                                    designated payment method (for example,
                                    PayPal) to ROYALFUT. The seller must have a
                                    valid payment method in their account. If
                                    the buyer&apos;s account has insufficient
                                    funds, the seller authorizes ROYALFUT to
                                    collect any amount owed using this payment
                                    method. ROYALFUT can also deposit the refund
                                    amount to the seller&apos;s account. If the
                                    seller does not provide ROYALFUT with a
                                    valid payment method, we may collect the
                                    outstanding amounts via other collection
                                    mechanisms, including collection
                                    withholding.
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    In the rare event when ROYALFUT determines
                                    that a dispute between Users was caused by a
                                    violation of the User Agreement, the
                                    violating User undertakes to pay ROYALFUT a
                                    penalty of €150.00. In addition, ROYALFUT
                                    may suspend or block the User&apos;s account
                                    and/or require a deposit of up to €300.00 to
                                    activate the User&apos;s account.
                                </Prose.ListItem>
                            </Prose.List>
                        </Prose.ListItem>
                        <Prose.ListItem>
                            Disclaimer of warranties; limitation of liability
                            <Prose.List numerical>
                                <Prose.ListItem>
                                    The features and services on the Website are
                                    provided on an «as is» and «as available»
                                    basis, and ROYALFUT expressly disclaims any
                                    warranties, express or implied, including,
                                    but not limited to, any warranty of
                                    condition, quality, durability, performance,
                                    accuracy, reliability, merchantability or
                                    suitability for a specific purpose. All such
                                    warranties, statements, conditions,
                                    obligations and conditions are excluded.
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    ROYALFUT does not make any representations
                                    or warranties regarding the validity,
                                    accuracy, correctness, reliability, quality,
                                    stability, completeness or timeliness of any
                                    information provided on or through the
                                    Website. ROYALFUT does not represent or
                                    warrant that the production, import,
                                    distribution, offer, display, purchase, sale
                                    and/or use of the products or services
                                    offered or displayed on the Website does not
                                    violate any rights of third parties, and
                                    ROYALFUT makes no representations or
                                    warranties of any kind with respect to any
                                    product or service offered or displayed on
                                    the Website.
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    Any material downloaded or otherwise
                                    obtained through the website is at the
                                    discretion and risk of each User, and each
                                    User is solely responsible for any damage to
                                    the computer system or loss of data that may
                                    result from the download of such material.
                                    No advice or information, oral or written,
                                    obtained by any User from ROYALFUT or
                                    through the Website, gives rise to any
                                    warranties not expressly stated in this
                                    document.
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    Under no circumstances will ROYALFUT be
                                    liable for any delay, failure or disruption
                                    of the content or services provided through
                                    the Website, arising directly or indirectly
                                    from natural phenomena, forces or causes
                                    beyond its control, including internet,
                                    computer, telecommunications or any other
                                    failures, equipment failures, electrical
                                    power failures, strikes, labor disputes,
                                    riots, protests, civil unrest, lack of
                                    manpower or materials, fires, floods,
                                    hurricanes, explosions, natural disasters,
                                    wars, government actions, orders of national
                                    or foreign courts or tribunals, or the
                                    non-compliance of obligations by third
                                    parties.
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    Every user agrees to indemnify and hold
                                    ROYALFUT, its affiliates, directors,
                                    officers and employees safe from any losses,
                                    claims, liabilities (including legal costs
                                    based on full compensation) that may arise
                                    directly or indirectly:
                                    <Prose.List
                                        numerical
                                        className="standart"
                                        type="1">
                                        <Prose.ListItem>
                                            from using the Website by the User,
                                            including, but not limited to, the
                                            display of information of such a
                                            User on the site
                                        </Prose.ListItem>
                                        <Prose.ListItem>
                                            from a violation by such a User of
                                            any of the terms and conditions of
                                            the Agreement
                                        </Prose.ListItem>
                                        <Prose.ListItem>
                                            from a violation by such a User of
                                            any statements and guarantees made
                                            by the ROYALFUT User, including, but
                                            not limited to, those that are put
                                            forth in sections 5.3, 5.4 and 5.5
                                            above.
                                        </Prose.ListItem>
                                        <Prose.ListItem>
                                            as the result of any claims made by
                                            third parties or other third parties
                                            related to the products offered or
                                            displayed on the Website.
                                        </Prose.ListItem>
                                    </Prose.List>
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    ROYALFUT and its affiliates, directors,
                                    officers and employees are not responsible
                                    for any special, direct, indirect or
                                    punitive damages, or any damages in general
                                    (including, but not limited to, damages due
                                    to loss of profit or savings, business
                                    interruption, loss of information), whether
                                    as a result of contract performance,
                                    negligence, tort, strict liability or
                                    otherwise, or any other loss arising from
                                    any of the following:
                                    <Prose.List
                                        numerical
                                        className="standart"
                                        type="1">
                                        <Prose.ListItem>
                                            usage or inability to use the
                                            Website
                                        </Prose.ListItem>
                                        <Prose.ListItem>
                                            any defect in goods, samples, data,
                                            information or services purchased or
                                            obtained from a user or third party
                                            service provider through the Website
                                        </Prose.ListItem>
                                        <Prose.ListItem>
                                            any claims or demands that the user
                                            makes to the production, import,
                                            distribution, offer, display,
                                            purchase, sale and/or use of
                                            products or services offered or
                                            displayed on the site may violate or
                                            be claimed to violate the Rights of
                                            third parties, or claims by any
                                            party that they are entitled to
                                            defense or redress in connection
                                            with a claim of rights; demands or
                                            claims of third parties claiming
                                            rights
                                        </Prose.ListItem>
                                        <Prose.ListItem>
                                            unauthorized access by third parties
                                            to the data or personal information
                                            of any User
                                        </Prose.ListItem>
                                        <Prose.ListItem>
                                            statements, behavior or materials
                                            posted by Users of the Website,
                                            including defamatory, offensive or
                                            illegal material
                                        </Prose.ListItem>
                                        <Prose.ListItem>
                                            any other reasons related to the
                                            activities of ROYALFUT and the
                                            provision of services through the
                                            Website
                                        </Prose.ListItem>
                                    </Prose.List>
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    ROYALFUT reserves the right at its own
                                    expense to assume exclusive protection and
                                    control over any matter, in which case you
                                    must cooperate with ROYALFUT in resolving
                                    such matter.
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    ROYALFUT reserves the right to restrict,
                                    prohibit or create different access to the
                                    Website and its features for different
                                    users, and change any features or introduce
                                    new features without prior notice. Every
                                    User acknowledges that the inability to use
                                    the Website in whole or in part for any
                                    reason may negatively affect their business.
                                    Every User agrees that in no event will
                                    ROYALFUT or any of its affiliates,
                                    directors, officers or employees be liable
                                    to the User or any third parties for any
                                    inability to use the Website (whether due to
                                    a violation, limited access, modification or
                                    termination of any function on the Website
                                    or otherwise).
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    ROYALFUT is not the author of third-party
                                    content, whether from anonymous users,
                                    public authors or paid content providers.
                                    Neither ROYALFUT nor any of its affiliates,
                                    directors, officers or employees have
                                    entered into any relations with such third
                                    parties. Any third party content is the sole
                                    responsibility of the party providing such
                                    content. Neither ROYALFUT nor any of its
                                    affiliates, directors, officers or employees
                                    are responsible for the accuracy, relevance,
                                    legality or validity of any third party
                                    content and is not liable to any User in
                                    connection with the reliance of Users on
                                    such third party content. In addition,
                                    neither ROYALFUT nor any of its affiliates,
                                    directors, officers or employees are
                                    responsible for the behavior of any User on
                                    the Website, and are not liable to any
                                    person in connection with any damage
                                    suffered by any person as a result of such
                                    User behavior.
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    ROYALFUT may authorize Users to access
                                    content, products or services offered by
                                    third parties via hyperlinks (verbal links,
                                    banners, channels or otherwise) to a website
                                    or profile/account on such third
                                    party&apos;s third party web service. The
                                    User acknowledges that ROYALFUT has no
                                    control over such third party websites, does
                                    not control such websites, and neither
                                    ROYALFUT nor any of its affiliates,
                                    directors, officers or employees are
                                    responsible or liable to anyone for such
                                    website or any content, products or services
                                    available on such website. The User must
                                    read the terms of use of such websites and
                                    the privacy policy before using such
                                    third-party websites in order to be aware of
                                    the Terms of Use of such websites.
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    ROYALFUT may authorize Users to access
                                    content, products or services offered by
                                    third parties via hyperlinks (verbal links,
                                    banners, channels or otherwise) to a website
                                    or profile/account on such third
                                    party&apos;s third party web service. The
                                    User acknowledges that ROYALFUT has no
                                    control over such third party websites, does
                                    not control such websites, and neither
                                    ROYALFUT nor any of its affiliates,
                                    directors, officers or employees are
                                    responsible or liable to anyone for such
                                    website or any content, products or services
                                    available on such website. The User must
                                    read the terms of use of such websites and
                                    the privacy policy before using such
                                    third-party websites in order to be aware of
                                    the Terms of Use of such websites.
                                </Prose.ListItem>
                            </Prose.List>
                        </Prose.ListItem>
                        <Prose.ListItem>
                            User notice
                            <Prose.List numerical>
                                <Prose.ListItem>
                                    All notices or claims to the User are
                                    effective if delivered in person, sent by
                                    courier, registered mail, fax or email to
                                    the last known correspondence, fax or email
                                    address provided by the ROYALFUT user, or by
                                    posting such notice or claim in the public
                                    domain of the Website for free. A
                                    User&apos;s notification is deemed to have
                                    been received by such User if and when:
                                    <Prose.List>
                                        <Prose.ListItem>
                                            ROYALFUT can demonstrate that a
                                            message, whether physical or
                                            electronic, was sent to such a User;
                                            or
                                        </Prose.ListItem>
                                        <Prose.ListItem>
                                            immediately upon ROYALFUT posting
                                            such notice in the public domain of
                                            the Website, which is available free
                                            of charge.
                                        </Prose.ListItem>
                                    </Prose.List>
                                </Prose.ListItem>
                            </Prose.List>
                        </Prose.ListItem>
                        <Prose.ListItem>
                            Legal dispute
                            <Prose.List numerical>
                                <Prose.ListItem>
                                    The parties agree that any legal or fair
                                    claim or dispute that arises or may arise
                                    between them in connection with this or
                                    previous versions of the ROYALFUT User
                                    Agreement, your use of or access to the
                                    Website, services or any products or
                                    services sold or purchased through the
                                    ROYALFUT websites, services, applications or
                                    tools will be resolved in accordance with
                                    the provisions set forth in this section
                                    about legal disputes.
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    The parties agree that any legal or fair
                                    claim or dispute that arises or may arise
                                    between them in connection with this or
                                    previous versions of the ROYALFUT User
                                    Agreement, your use of or access to the
                                    Website, services or any products or
                                    services sold or purchased through the
                                    ROYALFUT websites, services, applications or
                                    tools will be resolved in accordance with
                                    the provisions set forth in this section
                                    about legal disputes.
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    In the event of any dispute, claim, question
                                    or disagreement arising out of this
                                    Agreement or related to its violation, the
                                    parties to this Agreement will make every
                                    effort to resolve the dispute, claim, issue
                                    or disagreement. To this end, they
                                    conscientiously consult and negotiate with
                                    each other and, recognizing their mutual
                                    interests, try to reach a fair and equitable
                                    solution that satisfies both parties. If
                                    they do not reach such a decision within 60
                                    days, then after notification by one of the
                                    parties to the other party, all disputes,
                                    claims, questions or disagreements will be
                                    finally settled by the court at the location
                                    of the company Azur Apps FZ-LLC (Apartment
                                    40903, V Five Palm South Residence,
                                    Jumeirah, PB336929, Dubai, the United Arab
                                    Emirates) depending on the type of User.
                                </Prose.ListItem>
                            </Prose.List>
                        </Prose.ListItem>
                        <Prose.ListItem>
                            General information
                            <Prose.List numerical>
                                <Prose.ListItem>
                                    The ROYALFUT Agreement and all documents
                                    posted on our websites constitute the entire
                                    Agreement between the User and ROYALFUT in
                                    relation to the access to and use of the
                                    Website, superseding any previous written or
                                    oral Agreements in relation to the same
                                    subject matter of this Agreement.
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    ROYALFUT and the User are independent
                                    contractors and no agency, partnership,
                                    joint venture, employee-employer or
                                    franchisor-franchisee relationship is
                                    intended or created by this Agreement.
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    ROYALFUT&apos;s failure to exercise or
                                    enforce any right or provision of the terms
                                    of this Agreement does not constitute a
                                    waiver of such right or provision.
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    If any provision of the Agreement is held to
                                    be invalid or unenforceable, such provision
                                    will be removed from the Agreement and will
                                    not affect the validity and applicability of
                                    the remaining provisions of the Agreement.
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    The User agrees that there shall be no third
                                    party beneficiaries in the Agreement.
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    Headlines are for reference purposes only
                                    and in no way define, limit, interpret or
                                    describe the scope of the heading itself or
                                    scope of such a section.
                                </Prose.ListItem>
                            </Prose.List>
                        </Prose.ListItem>
                        <Prose.ListItem>
                            Compliance with AML/KYC policies
                            <Prose.List numerical>
                                <Prose.ListItem>
                                    The buyer and seller agree that ROYALFUT has
                                    a Know Your Customer and Anti-Money
                                    Laundering (AML) policy to combat internet
                                    fraud.
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    ROYALFUT has a ZERO TOLERANCE policy against
                                    internet fraud and any attempt to access or
                                    obtain customer information or other
                                    information on its websites by illegal or
                                    secret means. The company works with local,
                                    national and international fraud
                                    investigation agencies and uses a variety of
                                    electronic and other means to prevent,
                                    detect and suppress fraud. The company
                                    aggressively pursues, to the fullest extent
                                    of the law, culprits who have been detained
                                    and committed fraudulent activities on the
                                    Website. The company works with agencies
                                    such as state and local police, the US FBI,
                                    US and international customs agencies, and
                                    Interpol.
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    As part of Know Your Customer procedures,
                                    ROYALFUT evaluates customer transactions and
                                    collects and stores material facts about
                                    users, customers and their transactions.
                                    ROYALFUT is committed to protecting the
                                    rights of users and the privacy of their
                                    personal data. ROYALFUT collects personal
                                    information from Customers only to the
                                    extent necessary to properly provide
                                    services to Users. Personal data about
                                    buyers and former buyers may only be
                                    disclosed to third parties in a limited
                                    number of circumstances in accordance with
                                    applicable laws and Agreements between
                                    ROYALFUT and the User. ROYALFUT must
                                    carefully store customer files, including
                                    statements, transaction reports, receipts,
                                    notes, internal correspondence and any other
                                    documents pertaining to the customer
                                    electronically for as long as required by
                                    the underwriting teams at the respective
                                    acquiring banks.
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    Any financial transaction that could be
                                    linked to money laundering is considered
                                    suspicious. The basis for determining that a
                                    particular transaction is suspicious may be
                                    the personal observation and experience of
                                    ROYALFUT employees, as well as information
                                    received or identified. Subject to
                                    applicable laws and requirements of
                                    international organizations, ROYALFUT may,
                                    if necessary and without obligation to
                                    obtain approval or notification from the
                                    Client, notify regulatory and/or law
                                    enforcement authorities of any suspicious
                                    transactions. ROYALFUT should periodically
                                    consult lists published by local authorities
                                    and international organizations that contain
                                    lists of known terrorists or suspected
                                    terrorists, terrorist organizations, and
                                    high-risk countries subject to OFAC
                                    sanctions. ROYALFUT is required to conduct
                                    ongoing due diligence procedures regarding
                                    its customers by analyzing their
                                    transactions for suspicion of money
                                    laundering offenses.
                                </Prose.ListItem>
                            </Prose.List>
                        </Prose.ListItem>
                        <Prose.ListItem>
                            Consent to the processing of personal data
                            <Prose.Paragraph>
                                By registering with the service, the user grants
                                ROYALFUT their consent to check and process
                                their personal data based on the following
                                conditions:
                            </Prose.Paragraph>
                            <Prose.List numerical className="standart" type="1">
                                <Prose.ListItem>
                                    The Operator processes the data of the
                                    Subject in order to:
                                    <Prose.List>
                                        <Prose.ListItem>
                                            Provide you with our services.
                                        </Prose.ListItem>
                                        <Prose.ListItem>
                                            Contact you by email, phone or other
                                            means to resolve disputes, collect
                                            fees, troubleshoot your account or
                                            our sites, services, applications or
                                            tools, or for other purposes
                                            permitted by law.
                                        </Prose.ListItem>
                                        <Prose.ListItem>
                                            Prevent and detect fraud, security
                                            breaches, potentially prohibited or
                                            illegal activities, and enforce our
                                            user Agreements
                                        </Prose.ListItem>
                                        <Prose.ListItem>
                                            Check to identify our customers and
                                            verify their identity
                                        </Prose.ListItem>
                                        <Prose.ListItem>
                                            Operational reasons such as
                                            efficiency gains, training and
                                            quality control
                                        </Prose.ListItem>
                                        <Prose.ListItem>
                                            Prevent unauthorized access and
                                            modifications to our systems
                                        </Prose.ListItem>
                                        <Prose.ListItem>
                                            Marketing of our services and the
                                            services of select third parties
                                            for:
                                            <Prose.List className="checkmark">
                                                <Prose.ListItem>
                                                    existing and former clients
                                                </Prose.ListItem>
                                                <Prose.ListItem>
                                                    third parties who have
                                                    previously expressed
                                                    interest in our services
                                                </Prose.ListItem>
                                                <Prose.ListItem>
                                                    third parties with whom we
                                                    have previously had no
                                                    business
                                                </Prose.ListItem>
                                            </Prose.List>
                                        </Prose.ListItem>
                                        <Prose.ListItem>
                                            External audits and quality checks
                                        </Prose.ListItem>
                                    </Prose.List>
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    The list of personal data transferred to
                                    ROYALFUT for processing:
                                    <Prose.Paragraph>
                                        We may collect and use the following
                                        personal information about you:
                                    </Prose.Paragraph>
                                    <Prose.List>
                                        <Prose.ListItem>
                                            your name and contact information,
                                            including email address and
                                            telephone number
                                        </Prose.ListItem>
                                        <Prose.ListItem>
                                            information that allows us to verify
                                            and confirm your identity, such as
                                            your date of birth
                                        </Prose.ListItem>
                                        <Prose.ListItem>
                                            your gender information, if you
                                            choose to provide it to us
                                        </Prose.ListItem>
                                        <Prose.ListItem>
                                            computer login data, page view
                                            statistics, traffic to and from
                                            ROYALFUT, and cookie information
                                        </Prose.ListItem>
                                        <Prose.ListItem>
                                            location data
                                        </Prose.ListItem>
                                        <Prose.ListItem>
                                            information about your delivery
                                            (platform, number of coins in the
                                            order), billing information,
                                            information about transactions and
                                            payment cards
                                        </Prose.ListItem>
                                        <Prose.ListItem>
                                            your personal or professional
                                            interests
                                        </Prose.ListItem>
                                        <Prose.ListItem>
                                            your professional online presence
                                        </Prose.ListItem>
                                        <Prose.ListItem>
                                            your contact history with ROYALFUT,
                                            its employees, directors,
                                            affiliates, your purchase history
                                            and saved items on ROYALFUT
                                        </Prose.ListItem>
                                        <Prose.ListItem>
                                            information about the accounts you
                                            link to ROYALFUT, for example,
                                            Facebook, Google and other platforms
                                        </Prose.ListItem>
                                        <Prose.ListItem>
                                            information that allows us to
                                            conduct credit or other financial
                                            checks on you
                                        </Prose.ListItem>
                                        <Prose.ListItem>
                                            information on how you use the
                                            ROYALFUT Website
                                        </Prose.ListItem>
                                        <Prose.ListItem>
                                            your answers to polls, and
                                            information about participation in
                                            contests, giveaways and special
                                            offers
                                        </Prose.ListItem>
                                        <Prose.ListItem>
                                            transactional information based on
                                            your ROYALFUT activity (e.g.,
                                            information to simplify the buying
                                            and selling process)
                                        </Prose.ListItem>
                                        <Prose.ListItem>
                                            public discussions, chats, dispute
                                            resolution, correspondence via
                                            ROYALFUT, as well as correspondence
                                            sent to us
                                        </Prose.ListItem>
                                        <Prose.ListItem>
                                            other information, including IP
                                            address and standard web log
                                            information (browser type, Internet
                                            Service Provider (ISP),
                                            referral/exit pages, operating
                                            system, date/time stamp and
                                            clickstream data), as well as
                                            additional information from third
                                            parties, such as billing account
                                            information provided by any payment
                                            services you use to make purchases
                                            or receive payments, as well as your
                                            browser ID, cookie ID, device ID,
                                            device type, information about proxy
                                            server usage/VPN and related
                                            technologies, location information,
                                            email addresses, phone numbers and
                                            public social media profiles
                                            provided by our payment fraud
                                            service providers and customer due
                                            diligence.
                                        </Prose.ListItem>
                                    </Prose.List>
                                    <Prose.Paragraph>
                                        This personal data is required to
                                        provide you with our services. You can
                                        choose not to provide us with
                                        information, but some information about
                                        you is necessary in order for you to:
                                        register as a member; purchase products
                                        or services, complete a profile; take
                                        part in surveys, competitions or draws;
                                        ask us a question, or initiate other
                                        transactions on our Website. ROYALFUT
                                        also uses this information for trend
                                        analysis, fraud detection and site
                                        administration.
                                    </Prose.Paragraph>
                                </Prose.ListItem>
                            </Prose.List>
                            <Prose.Paragraph>
                                Consent is valid from the moment the personal
                                data subject is registered at{" "}
                                <Prose.Anchor href={HOST_URL} target="_blank">
                                    https://royalfut.com
                                </Prose.Anchor>
                            </Prose.Paragraph>
                        </Prose.ListItem>
                        <Prose.ListItem>
                            Cookie processing policy
                            <Prose.Paragraph>
                                By visiting{" "}
                                <Prose.Anchor href={HOST_URL} target="_blank">
                                    https://royalfut.com
                                </Prose.Anchor>
                                , you accept this policy, including the fact
                                that ROYALFUT may use cookies and other data for
                                their subsequent processing by Google Analytics,
                                Yandex.Metrics and other systems, and may also
                                transfer them to third parties to conduct
                                research, carry out works or provide services.
                            </Prose.Paragraph>
                            <Prose.Paragraph>
                                When visiting{" "}
                                <Prose.Anchor href={HOST_URL} target="_blank">
                                    https://royalfut.com
                                </Prose.Anchor>
                                , cookies can be used to:
                            </Prose.Paragraph>
                            <Prose.List>
                                <Prose.ListItem>
                                    ensure the site functions securely an
                                    properly
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    improve site quality
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    registration on the site
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    provide you with information about the site,
                                    including its products and services
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    improve products and/or services, and
                                    develop new products and/or services.
                                </Prose.ListItem>
                            </Prose.List>
                            <Prose.Paragraph>
                                Other information collected may be used to
                                generate your «list of interests,» which
                                consists of a random identifier, interest
                                category and timestamp to show you online
                                content and advertisements matching your
                                interests.
                            </Prose.Paragraph>
                            <Prose.Paragraph>
                                The browser and/or device you use may allow you
                                to block, delete or otherwise restrict the use
                                of cookies. However, cookies are an important
                                part of{" "}
                                <Prose.Anchor href={HOST_URL} target="_blank">
                                    https://royalfut.com
                                </Prose.Anchor>
                                , so blocking, deleting or restricting their use
                                may result in a loss of access to many of the
                                site’s features.
                            </Prose.Paragraph>
                            <Prose.Paragraph>
                                To learn how to manage cookies in the browser or
                                on the device you use, you can follow the
                                instructions provided by the browser&apos;s
                                developer or device manufacturer.
                            </Prose.Paragraph>
                        </Prose.ListItem>
                    </Prose.List> */}
                    <Prose.Paragraph>
                        <Prose.Anchor
                            href="/Terms_and_conditions_from_01_10_2020_01_10_2020_07_02_2021.pdf"
                            target="_blank"
                            rel="nofollow">
                            Terms and conditions from 01.10.2020 (01.10.2020 -
                            07.02.2021)
                        </Prose.Anchor>
                    </Prose.Paragraph>
                    <Prose.Paragraph>
                        <Prose.Anchor
                            href="/Terms_and_conditions_from_08_02_2021_08_02_2021_03_06_2021.pdf"
                            target="_blank"
                            rel="nofollow">
                            Terms and conditions from 08.02.2021 (08.02.2021 -
                            03.06.2021)
                        </Prose.Anchor>
                    </Prose.Paragraph>
                    <Prose.Paragraph>
                        <Prose.Anchor
                            href="/Privacy_Policy_from_01_10_2020_01_10_2020_07_02_2021.pdf"
                            target="_blank"
                            rel="nofollow">
                            Privacy Policy from 01.10.2020 (01.10.2020 -
                            07.02.2021)
                        </Prose.Anchor>
                    </Prose.Paragraph>
                </ContentWithAsideLayout.Content>
                <ContentWithAsideLayout.Aside>
                    <CoinTransactionPromptCard />
                </ContentWithAsideLayout.Aside>
            </ContentWithAsideLayout.Body>
        </ContentWithAsideLayout.Root>
    );
};

export default Page;
