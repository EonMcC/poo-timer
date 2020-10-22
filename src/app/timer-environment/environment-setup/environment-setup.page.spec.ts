import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EnvironmentSetupPage } from './environment-setup.page';

describe('EnvironmentSetupPage', () => {
  let component: EnvironmentSetupPage;
  let fixture: ComponentFixture<EnvironmentSetupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvironmentSetupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EnvironmentSetupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
