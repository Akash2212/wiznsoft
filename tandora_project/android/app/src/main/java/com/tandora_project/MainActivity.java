package com.tandora_project;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import android.os.Bundle;
import android.app.Activity;
import androidx.annotation.Nullable;
import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;


public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "tandora_project";
  }

  public static class TestActivityDelegate extends ReactActivityDelegate {
    private static final String TEST = "test";
    private Bundle mInitialProps = null;
    private final
    @Nullable
    Activity mActivity;

    public TestActivityDelegate(Activity activity, String mainComponentName) {
        super(activity, mainComponentName);
        this.mActivity = activity;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        Bundle bundle = mActivity.getIntent().getExtras();
        if (bundle != null && bundle.containsKey(TEST)) {
            mInitialProps = new Bundle();
            mInitialProps.putString(TEST, bundle.getString(TEST));
        }
        super.onCreate(savedInstanceState);
        
    }

    @Override
    protected Bundle getLaunchOptions() {
        return mInitialProps;
    }
}

@Override
protected ReactActivityDelegate createReactActivityDelegate() {
    return new TestActivityDelegate(this, getMainComponentName());
  }



}
