import React from "react";
import SideMenu from "../sideMenu/SideMenu";
import Profile from "../profile/Profile";
import "./help.css";

function Help() {
  return (
    <div className="Help">
      <div className="HelpHero">
        <h1>FAQs</h1>
        <p>
          <h3> Q1 How to carry forward previous month balance? </h3>
          If you wish to carry forward your previous month's balance to current
          month, you can enable the "Carry forward balance" setting from the
          app's settings page.
          <h3> Q2 What are transfer transactions? </h3>
          Transfer transactions are neither counted as expense nor as income but
          helps you to track transfers between your different payment modes. For
          example, you paid your credit card bill, you can log it as a transfer
          transaction or you took out cash from ATM, you can log it as a
          transfer transaction.
          <h3>
            {" "}
            Q3 How to log investment transactions, as it is neither an expense
            nor income?{" "}
          </h3>
          We understand that investments are not actually expenses. But as the
          money that is invested is also coming from your income only, we
          suggest you to include investments in your budget. The app provides
          you with a Investments category, so while planning and creating your
          monthly budget you should allocate as much money as you wish to
          investments. For example, if your income is ₹50,000, and you want to
          keep aside ₹8,000 as savings, then your total budget should be
          ₹42,000. And if you wish to invest ₹6,000, then you should allocate a
          budget of ₹6,000 to the Investments category, and the remaining
          balance among all other categories.
          <h3> Q4 How to add recurring transactions? </h3>
          Recurring reminders are a great way to ease up your work. Go to the
          reminders page, and tap on '+' icon. Set the amount, category, and
          payment for the intended transaction. Now, set the time you want to be
          reminded and set the frequency of the reminder, you can choose from
          "does not repeat, every day, every week, every month, every year" or
          you can set a custom frequency. After the reminder has been set you
          will receive a notification reminder about the transaction at the set
          time and day. You can tap on the notification to add the transaction.
          <h3> Q5 How to generate a PDF report of my transactions? </h3>
          Go to the Settings page inside the app, click on Export data, select
          PDF and then select a month or year to generate its report.
          <h3> Q6 How to backup my data? </h3>
          As you would already know that all the financial data which you store
          in the app is only stored on your device. It is very important to
          backup your data regularly, so that you can easily restore it if you
          change your device or you re-install the app on the same device. The
          app offers three types of data backup options: Local backup Creates a
          backup of your data on your device's local storage. Go to the Settings
          page inside the app, click on Backup and then select Local Storage to
          create a new backup of your data. Google Drive backup Creates a backup
          of your data on your Google Drive. Go to the Settings page inside the
          app, click on Backup and then select Google Drive to create a new
          backup of your data. iCloud backup (iOS only) Creates a backup of your
          data on your iCloud Storage. Go to the Settings page inside the app,
          click on Backup and then select iCloud to create a new backup of your
          data. Automatic Cloud backup Automatically creates a backup of your
          data on your Google Drive (on Android) or iCloud Storage (on iOS)
          daily. Go to the Settings page inside the app, scroll to Backup,
          restore & export section, and then enable Automatic Cloud backups.
          <h3> Q7 How to export my data? </h3>
          You can either export your data as a PDF or a CSV file. You can check
          Q5 to learn more about how to generate a PDF report of your
          transactions. You can export your data as a CSV file, which can then
          be opened in Excel. Go to the Settings page inside the app, click on
          Export data and then either select a month or year to export its data
          or click on Export All Data to export all data.
          <h3> Q8 How to restore my data on a new device? </h3>
          To restore your data, first make sure that you're logged in with the
          same Google account or Apple ID in your device, with which your were
          logged in with when you took the backup. Then go to the app's Settings
          page, click on restore, select Google Drive or iCloud, and then choose
          the backup file you want to restore your data from.
          <h3>
            {" "}
            Q9 How to transfer data between Android & iOS when switching
            devices?{" "}
          </h3>
          If you're switching between Android and iOS devices and want to
          transfer your data, we recommend using Google Drive backups. Here are
          the steps: On your original device, go to the app's Settings page,
          click on Backup, and then select Google Drive to create a new backup
          of your data. Set up your new device and install the app. On the new
          device, sign in to the app using the same Google account used for the
          backup on the original device. Go to the app's Settings page, click on
          Restore, select Google Drive, and choose the backup file you want to
          restore your data from. This way, all your transactions, including
          images, will be transferred to your new device.
          <h3> Q10 How to edit or create new categories? </h3>
          The app provides you with 18 predefined categories (14 expense
          categories & 4 income categories). You can edit these categories or
          create new categories by going to the Categories page in the app.
          <h3> Q11 How to manage multiple accounts inside the app? </h3>
          You can use Tags to simulate multiple accounts functionality. Suppose,
          you own a business, and you want to use the app to manage your
          business transactions as well as your personal transactions, then you
          can use 2 different tags, say, "business" and "personal" to track
          these transactions separately, while also getting a combined report
          and analysis for all the transactions. You can view transactions with
          a specific tag by applying filters on the Custom View page. To get
          monthly or yearly analysis of a specific tag, go to the month analysis
          or year analysis page and tap on that tag.
          <h3> Q12 How to create sub-categories? </h3>
          We provide sub-category functionality through Tags. If you want to
          track your expenses for a specific item or a specific type of item,
          but you don't want to create a separate category for them. Suppose,
          you want to track your expenses on milk, but you don't want to create
          a separate category for milk, because you also want to track your
          total spending on all food items. Then, tags are the way to go. You
          can add a milk tag in each of your transactions for milk while also
          categorizing it into the food category.
        </p>
      </div>
    </div>
  );
}

export default Help;
