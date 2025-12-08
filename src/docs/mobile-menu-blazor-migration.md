# Mobile Menu - Blazor Migration Guide

**Target Framework:** .NET 8 Blazor  
**Migration Complexity:** Medium  
**Estimated Time:** 2-3 weeks  
**Last Updated:** December 8, 2024

---

## Table of Contents

1. [Migration Overview](#migration-overview)
2. [Architecture Translation](#architecture-translation)
3. [Step-by-Step Implementation](#step-by-step-implementation)
4. [Code Examples](#code-examples)
5. [JavaScript Interop](#javascript-interop)
6. [State Management](#state-management)
7. [Animation Implementation](#animation-implementation)
8. [Testing Strategy](#testing-strategy)
9. [Performance Considerations](#performance-considerations)

---

## Migration Overview

### Complexity Analysis

| Aspect | Complexity | Reason |
|--------|-----------|--------|
| Component Structure | Low | Simple hierarchy, no deep nesting |
| State Management | Low | Single service with simple state |
| Animations | Medium | CSS animations replace Motion library |
| Body Scroll Lock | Medium | Requires JavaScript interop |
| Data Layer | Low | Direct C# class translation |
| Icons | Low | SVG copy-paste |

### Dependencies Required

```xml
<!-- No special NuGet packages needed! -->
<!-- Blazor built-in features sufficient -->
```

### File Structure Target

```
/Components/MobileMenu/
  ├── MobileMenu.razor
  ├── MobileMenu.razor.cs
  ├── MobileMenu.razor.css
  ├── MobileMenuHeader.razor
  ├── MobileMenuMain.razor
  ├── MobileMenuShop.razor
  ├── MobileMenuButtons.razor
  └── ExpandableSection.razor

/Components/Icons/Mobile/
  ├── CloseIcon.razor
  ├── ChevronRightIcon.razor
  ├── AddIcon.razor
  ├── MinusIcon.razor
  └── MobileMenuLogo.razor

/Services/
  └── MobileMenuService.cs

/Models/
  └── MobileMenuModels.cs

/wwwroot/css/
  └── mobile-menu-animations.css

/wwwroot/js/
  └── mobile-menu.js
```

---

## Architecture Translation

### React → Blazor Mapping

```
┌─────────────────────────────────────────────────────────────┐
│ REACT                           BLAZOR                       │
├─────────────────────────────────────────────────────────────┤
│ useState()                   →  Component State              │
│ useEffect()                  →  OnAfterRenderAsync()         │
│ useMobileMenu hook           →  MobileMenuService            │
│ mobileMenuData.ts            →  MobileMenuConfig.cs          │
│ Motion animations            →  CSS animations + classes     │
│ AnimatePresence              →  Conditional rendering        │
│ Props drilling               →  CascadingParameter           │
│ Optional chaining (?.)       →  Null-conditional (?.)        │
│ Array.map()                  →  @foreach                     │
│ Inline styles                →  CSS classes                  │
└─────────────────────────────────────────────────────────────┘
```

---

## Step-by-Step Implementation

### Phase 1: Data Layer (Day 1)

#### Step 1.1: Create Models

**File:** `/Models/MobileMenuModels.cs`

```csharp
namespace YourApp.Models.MobileMenu
{
    public enum MenuLevel
    {
        Main,
        Shop
    }

    public enum ExpandedSection
    {
        None,
        Categories,
        BodyPart,
        BodyFunction,
        HealthIssues
    }

    public class MainMenuItem
    {
        public string Id { get; set; } = string.Empty;
        public string Label { get; set; } = string.Empty;
        public string? Action { get; set; }
    }

    public class ShopSection
    {
        public string Id { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public List<string> Items { get; set; } = new();
    }

    public class ShopLink
    {
        public string Id { get; set; } = string.Empty;
        public string Label { get; set; } = string.Empty;
        public string Action { get; set; } = string.Empty;
    }

    public class MenuButton
    {
        public string Id { get; set; } = string.Empty;
        public string Label { get; set; } = string.Empty;
        public ButtonVariant Variant { get; set; }
        public string Action { get; set; } = string.Empty;
    }

    public enum ButtonVariant
    {
        Primary,
        Secondary
    }

    public class AnimationConfig
    {
        public double BackdropDuration { get; set; } = 0.2;
        public double MenuPanelDuration { get; set; } = 0.2;
        public double HeaderTransitionDuration { get; set; } = 0.3;
        public double ItemStaggerDelay { get; set; } = 0.05;
        public double ItemStaggerDuration { get; set; } = 0.3;
        public double SectionExpandDuration { get; set; } = 0.3;
        public double ButtonsDelay { get; set; } = 0.3;
    }

    public class LayoutConfig
    {
        public string PanelWidth { get; set; } = "480px";
        public string ContentPadding { get; set; } = "20px";
        public string HeaderMarginBottom { get; set; } = "30px";
        public string ItemGap { get; set; } = "8px";
        public string ShopBottomSpacer { get; set; } = "60px";
    }

    public class TextContent
    {
        public BreadcrumbText Breadcrumb { get; set; } = new();
        public AriaLabels AriaLabels { get; set; } = new();
    }

    public class BreadcrumbText
    {
        public string Back { get; set; } = "Shop";
    }

    public class AriaLabels
    {
        public string CloseMenu { get; set; } = "Close menu";
        public string BackToMain { get; set; } = "Back to main menu";
    }
}
```

#### Step 1.2: Create Configuration

**File:** `/Services/MobileMenuConfig.cs`

```csharp
using YourApp.Models.MobileMenu;

namespace YourApp.Services
{
    public class MobileMenuConfig
    {
        public List<MainMenuItem> MainMenuItems { get; } = new()
        {
            new() { Id = "shop", Label = "Shop", Action = "shop" },
            new() { Id = "learn", Label = "Learn", Action = "learn" },
            new() { Id = "about", Label = "About", Action = "about" },
            new() { Id = "help", Label = "Help", Action = "help" },
            new() { Id = "specials", Label = "Specials", Action = "specials" }
        };

        public List<ShopSection> ShopSections { get; } = new()
        {
            new()
            {
                Id = "categories",
                Title = "Categories",
                Items = new()
                {
                    "Anti-Aging", "Antioxidants", "Beauty", "Beverages",
                    "Bone & Skeletal Health", "Brain Health", "Cardiovascular Health",
                    "Circulation", "Digestive Health", "Energy", "Immune Health",
                    "Individual Vitamins & Minerals", "Joint Health", "Meals & Proteins",
                    "Multivitamins", "Pet Products", "Sleep & Relaxation", "Stress & Mood",
                    "Sweeteners", "Vision Health", "Weight Management", "Other"
                }
            },
            new()
            {
                Id = "bodyPart",
                Title = "Body Part",
                Items = new()
                {
                    "Arteries", "Bladder", "Blood", "Bones", "Brain", "Breast",
                    "Colon", "Ears", "Eyes", "Endocrine System", "GI Tract",
                    "Hair, Skin, & Nails", "Heart", "Immune System", "Joints",
                    "Kidneys", "Legs", "Liver", "Lungs", "Muscles", "Nerves",
                    "Prostate", "Reproductive System", "Stomach", "Urinary Tract", "Veins"
                }
            },
            new()
            {
                Id = "bodyFunction",
                Title = "Body Function",
                Items = new()
                {
                    "Breathing or Respiration", "Cell protection", "Circulation",
                    "Cognitive Function", "Detoxification", "Digestion",
                    "Energy Production", "Hormone Balancing", "Immune Defense",
                    "Memory", "Metabolism", "Mood Balancing", "Movement",
                    "Skin Protection", "Sleep", "Structural Support",
                    "Urinary Function", "Vision", "Waste Removal"
                }
            },
            new()
            {
                Id = "healthIssues",
                Title = "Health Issues",
                Items = new()
                {
                    "Joint Pain and Stiffness", "Heart and Blood Vessel Health",
                    "High Blood Pressure", "Type 2 Diabetes", "Cholesterol Management",
                    "Anxiety and Stress", "Depression", "Memory and Brain Health",
                    "Sleep Disorders", "Immune Health", "Bone Strength",
                    "Vision Problems", "Fatigue", "Menopause Symptoms",
                    "Liver Health", "Urinary Tract Infections", "Digestive Health",
                    "Breathing Problems"
                }
            }
        };

        public List<ShopLink> ShopLinks { get; } = new()
        {
            new() { Id = "ingredients", Label = "Ingredients", Action = "ingredients" },
            new() { Id = "all-products", Label = "Shop All Products", Action = "all-products" }
        };

        public List<MenuButton> MenuButtons { get; } = new()
        {
            new() { Id = "register", Label = "Register", Variant = ButtonVariant.Primary, Action = "register" },
            new() { Id = "signin", Label = "Sign In", Variant = ButtonVariant.Secondary, Action = "signin" }
        };

        public AnimationConfig Animation { get; } = new();
        public LayoutConfig Layout { get; } = new();
        public TextContent Text { get; } = new();
    }
}
```

#### Step 1.3: Register Configuration

**File:** `Program.cs`

```csharp
builder.Services.AddSingleton<MobileMenuConfig>();
builder.Services.AddScoped<MobileMenuService>();
```

---

### Phase 2: State Management (Day 2)

**File:** `/Services/MobileMenuService.cs`

```csharp
using YourApp.Models.MobileMenu;

namespace YourApp.Services
{
    public class MobileMenuService
    {
        private MenuLevel _menuLevel = MenuLevel.Main;
        private ExpandedSection _expandedSection = ExpandedSection.None;

        public MenuLevel MenuLevel
        {
            get => _menuLevel;
            private set
            {
                _menuLevel = value;
                NotifyStateChanged();
            }
        }

        public ExpandedSection ExpandedSection
        {
            get => _expandedSection;
            private set
            {
                _expandedSection = value;
                NotifyStateChanged();
            }
        }

        public event Action? OnStateChanged;

        public void NavigateToShop()
        {
            MenuLevel = MenuLevel.Shop;
        }

        public void NavigateToMain()
        {
            MenuLevel = MenuLevel.Main;
            ExpandedSection = ExpandedSection.None;
        }

        public void ToggleSection(ExpandedSection section)
        {
            ExpandedSection = ExpandedSection == section 
                ? ExpandedSection.None 
                : section;
        }

        public void Reset()
        {
            MenuLevel = MenuLevel.Main;
            ExpandedSection = ExpandedSection.None;
            NotifyStateChanged();
        }

        private void NotifyStateChanged() => OnStateChanged?.Invoke();
    }
}
```

---

### Phase 3: JavaScript Interop (Day 2)

**File:** `/wwwroot/js/mobile-menu.js`

```javascript
/**
 * Mobile Menu JavaScript Interop
 * Handles body scroll locking for iOS compatibility
 */
window.mobileMenu = {
    scrollY: 0,

    /**
     * Lock body scroll and store current position
     */
    lockScroll: function () {
        // Store current scroll position
        this.scrollY = window.scrollY;

        // Apply iOS-compatible scroll lock
        document.body.style.position = 'fixed';
        document.body.style.top = `-${this.scrollY}px`;
        document.body.style.width = '100%';
        document.body.style.overflow = 'hidden';

        console.log('Mobile menu: Scroll locked at', this.scrollY);
    },

    /**
     * Unlock body scroll and restore position
     */
    unlockScroll: function () {
        const scrollY = this.scrollY;

        // Remove scroll lock styles
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';

        // Restore scroll position
        window.scrollTo(0, scrollY);

        console.log('Mobile menu: Scroll unlocked, restored to', scrollY);
    }
};
```

**Include in `_Host.cshtml` or `App.razor`:**

```html
<script src="js/mobile-menu.js"></script>
```

---

### Phase 4: Icon Components (Day 3)

**File:** `/Components/Icons/Mobile/CloseIcon.razor`

```html
<div class="relative shrink-0 size-[24px]" data-name="icon close">
    <svg class="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g>
            <path d="M18 6L6 18" stroke="#003B3C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M6 6L18 18" stroke="#003B3C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </g>
    </svg>
</div>
```

**File:** `/Components/Icons/Mobile/ChevronRightIcon.razor`

```html
<div class="relative shrink-0 size-[24px]" data-name="icon chevron right">
    <svg class="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g>
            <path d="M9 6L15 12L9 18" stroke="#003B3C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </g>
    </svg>
</div>
```

**File:** `/Components/Icons/Mobile/AddIcon.razor`

```html
<div class="relative shrink-0 size-[24px]" data-name="icon add">
    <svg class="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g>
            <path d="M12 5V19" stroke="#003B3C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M5 12H19" stroke="#003B3C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </g>
    </svg>
</div>
```

**File:** `/Components/Icons/Mobile/MinusIcon.razor`

```html
<div class="relative shrink-0 size-[24px]" data-name="icon minus">
    <svg class="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g>
            <path d="M5 12H19" stroke="#003B3C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </g>
    </svg>
</div>
```

**File:** `/Components/Icons/Mobile/MobileMenuLogo.razor`

```html
<div class="h-[40px] relative shrink-0 w-[109.074px]" data-name="logo">
    <svg class="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 110 40">
        <g id="logo">
            <!-- Copy SVG paths from MobileMenuLogo.tsx -->
            <!-- Paths omitted for brevity - copy from React component -->
        </g>
    </svg>
</div>
```

---

### Phase 5: Subcomponents (Days 4-5)

**File:** `/Components/MobileMenu/MobileMenuHeader.razor`

```html
@using YourApp.Models.MobileMenu
@using YourApp.Components.Icons.Mobile
@inject MobileMenuConfig Config

<div class="flex items-center justify-between w-full mb-[30px]">
    <!-- Logo / Breadcrumb Container -->
    <div class="relative h-[40px] w-[109.074px]">
        @if (MenuLevel == MenuLevel.Main)
        {
            <div class="@GetHeaderClass("logo")">
                <MobileMenuLogo />
            </div>
        }
        else
        {
            <div class="@GetHeaderClass("breadcrumb")" @onclick="OnBackToMain">
                <div class="flex items-center justify-center">
                    <div class="flex-none rotate-[180deg] scale-y-[-100%]">
                        <ChevronRightIcon />
                    </div>
                </div>
                <p class="font-['Inter:Regular',sans-serif] font-normal leading-[1.2] not-italic text-[#003b3c] text-[16px] text-nowrap tracking-[-0.16px] whitespace-pre">
                    @Config.Text.Breadcrumb.Back
                </p>
            </div>
        }
    </div>

    <!-- Close Button -->
    <button @onclick="OnClose"
            class="text-[#003B3C] hover:opacity-70 transition-opacity"
            aria-label="@Config.Text.AriaLabels.CloseMenu">
        <CloseIcon />
    </button>
</div>

@code {
    [Parameter] public MenuLevel MenuLevel { get; set; }
    [Parameter] public EventCallback OnBackToMain { get; set; }
    [Parameter] public EventCallback OnClose { get; set; }

    private string GetHeaderClass(string type)
    {
        var baseClass = "absolute inset-0";
        var animClass = type == "logo" ? "header-logo" : "header-breadcrumb";
        return $"{baseClass} {animClass}";
    }
}
```

**File:** `/Components/MobileMenu/ExpandableSection.razor`

```html
@using YourApp.Models.MobileMenu
@using YourApp.Components.Icons.Mobile
@inject MobileMenuConfig Config

<div class="@GetSectionClass()" style="@GetAnimationDelay()">
    <!-- Section Header -->
    <div class="content-stretch flex items-center justify-between relative shrink-0 w-full cursor-pointer"
         @onclick="OnToggle">
        <p class="font-['Inter:Medium',sans-serif] font-medium leading-[1.4] not-italic text-[#003b3c] text-[24px] text-nowrap tracking-[-0.48px] whitespace-pre">
            @Title
        </p>
        @if (IsExpanded)
        {
            <MinusIcon />
        }
        else
        {
            <AddIcon />
        }
    </div>

    <!-- Expandable Content -->
    @if (IsExpanded)
    {
        <div class="section-content section-expanded">
            <div class="box-border content-stretch flex flex-col gap-[10px] items-center justify-center pb-[30px] pt-[10px] px-0 relative shrink-0 w-full">
                <div class="font-['Inter:Regular',sans-serif] font-normal leading-[2] not-italic relative shrink-0 text-[#003b3c] text-[16px] w-full">
                    @foreach (var item in Items)
                    {
                        <p class="mb-0 cursor-pointer hover:opacity-70 transition-opacity"
                           @onclick="() => OnItemClick?.Invoke(item)">
                            @item
                        </p>
                    }
                </div>
            </div>
        </div>
    }
</div>

@code {
    [Parameter] public string Id { get; set; } = string.Empty;
    [Parameter] public string Title { get; set; } = string.Empty;
    [Parameter] public List<string> Items { get; set; } = new();
    [Parameter] public bool IsExpanded { get; set; }
    [Parameter] public EventCallback OnToggle { get; set; }
    [Parameter] public EventCallback<string> OnItemClick { get; set; }
    [Parameter] public int CustomIndex { get; set; }

    private string GetSectionClass() => 
        $"content-stretch flex flex-col items-start relative shrink-0 w-full menu-item-stagger";

    private string GetAnimationDelay() => 
        $"animation-delay: {CustomIndex * 50}ms;";
}
```

---

### Phase 6: Main Component (Days 6-7)

**File:** `/Components/MobileMenu/MobileMenu.razor`

```html
@using YourApp.Models.MobileMenu
@inject IJSRuntime JS
@inject MobileMenuService MenuService
@inject MobileMenuConfig Config
@implements IDisposable

@if (IsOpen)
{
    <!-- Backdrop -->
    <div class="@GetBackdropClass()" @onclick="HandleClose"></div>

    <!-- Menu Panel -->
    <div class="@GetPanelClass()" data-name="mobile menu overlay">
        <!-- Scrollable Content -->
        <div class="@GetContentClass()">
            <!-- Header -->
            <MobileMenuHeader MenuLevel="@MenuService.MenuLevel"
                            OnBackToMain="HandleBackToMain"
                            OnClose="HandleClose" />

            <!-- Main Menu Level -->
            @if (MenuService.MenuLevel == MenuLevel.Main)
            {
                <MobileMenuMain OnShopClick="HandleShopClick"
                              OnAboutClick="OnOurStoryClick" />
            }

            <!-- Shop Menu Level -->
            @if (MenuService.MenuLevel == MenuLevel.Shop)
            {
                <MobileMenuShop ExpandedSection="@MenuService.ExpandedSection"
                              OnToggleSection="HandleToggleSection"
                              OnNavigate="OnNavigate"
                              OnIngredientsClick="OnIngredientsClick"
                              OnClose="HandleClose" />
            }
        </div>

        <!-- Bottom Buttons -->
        @if (MenuService.MenuLevel == MenuLevel.Main)
        {
            <MobileMenuButtons OnRegister="OnRegister"
                             OnSignIn="OnSignIn" />
        }
    </div>
}

@code {
    [Parameter] public bool IsOpen { get; set; }
    [Parameter] public EventCallback OnClose { get; set; }
    [Parameter] public EventCallback<string> OnNavigate { get; set; }
    [Parameter] public EventCallback OnIngredientsClick { get; set; }
    [Parameter] public EventCallback OnOurStoryClick { get; set; }
    [Parameter] public EventCallback OnRegister { get; set; }
    [Parameter] public EventCallback OnSignIn { get; set; }

    protected override void OnInitialized()
    {
        MenuService.OnStateChanged += StateHasChanged;
    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (IsOpen)
        {
            await JS.InvokeVoidAsync("mobileMenu.lockScroll");
        }
        else
        {
            await JS.InvokeVoidAsync("mobileMenu.unlockScroll");
        }
    }

    private async Task HandleShopClick()
    {
        MenuService.NavigateToShop();
    }

    private async Task HandleBackToMain()
    {
        MenuService.NavigateToMain();
    }

    private async Task HandleToggleSection(ExpandedSection section)
    {
        MenuService.ToggleSection(section);
    }

    private async Task HandleClose()
    {
        MenuService.Reset();
        await OnClose.InvokeAsync();
    }

    private string GetBackdropClass() =>
        "fixed inset-0 bg-black/40 z-50 m:block hidden mobile-menu-backdrop";

    private string GetPanelClass() =>
        $"fixed inset-0 m:inset-y-0 m:left-0 m:right-auto bg-white z-50 flex flex-col m:shadow-2xl mobile-menu-panel {(IsOpen ? "menu-open" : "")}";

    private string GetContentClass() =>
        $"flex-1 flex flex-col gap-[10px] items-start overflow-y-auto overflow-x-hidden p-[{Config.Layout.ContentPadding}] {(MenuService.MenuLevel == MenuLevel.Shop ? "pb-[120px]" : "pb-0")}";

    public void Dispose()
    {
        MenuService.OnStateChanged -= StateHasChanged;
    }
}
```

---

### Phase 7: CSS Animations (Day 8)

**File:** `/wwwroot/css/mobile-menu-animations.css`

```css
/**
 * Mobile Menu Animations
 * Replaces Motion library animations with CSS
 */

/* ===== BACKDROP ===== */
.mobile-menu-backdrop {
    animation: fadeIn 0.2s ease-out forwards;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

/* ===== PANEL ===== */
.mobile-menu-panel {
    width: 100%;
    animation: panelAppear 0.2s ease-out forwards;
}

@media (min-width: 768px) {
    .mobile-menu-panel {
        width: 480px;
    }
}

@keyframes panelAppear {
    from { opacity: 0; }
    to { opacity: 1; }
}

/* ===== HEADER TRANSITIONS ===== */
.header-logo,
.header-breadcrumb {
    animation: headerSlideIn 0.3s ease-out forwards;
}

@keyframes headerSlideIn {
    from {
        opacity: 0;
        transform: translateX(20px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

/* ===== MENU ITEM STAGGER ===== */
.menu-item-stagger {
    opacity: 0;
    animation: menuItemSlideIn 0.3s ease-out forwards;
}

@keyframes menuItemSlideIn {
    from {
        opacity: 0;
        transform: translateX(-20px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

/* Stagger delays (applied inline via style attribute) */
/* Example: style="animation-delay: 0ms;" */
/* Example: style="animation-delay: 50ms;" */
/* Example: style="animation-delay: 100ms;" */

/* ===== SECTION EXPAND/COLLAPSE ===== */
.section-content {
    overflow: hidden;
    max-height: 0;
    opacity: 0;
    transition: max-height 0.3s ease-out, opacity 0.3s ease-out;
}

.section-expanded {
    max-height: 2000px; /* Large enough for content */
    opacity: 1;
}

/* ===== BUTTONS ===== */
.menu-buttons {
    opacity: 0;
    animation: buttonsSlideUp 0.3s ease-out forwards;
    animation-delay: 0.3s;
}

@keyframes buttonsSlideUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* ===== UTILITIES ===== */
.mobile-menu-panel {
    /* GPU acceleration for smooth animations */
    transform: translateZ(0);
    will-change: transform, opacity;
}
```

---

## Testing Strategy

### Unit Testing

```csharp
// MobileMenuServiceTests.cs
using Xunit;

public class MobileMenuServiceTests
{
    [Fact]
    public void NavigateToShop_SetsMenuLevelToShop()
    {
        // Arrange
        var service = new MobileMenuService();

        // Act
        service.NavigateToShop();

        // Assert
        Assert.Equal(MenuLevel.Shop, service.MenuLevel);
    }

    [Fact]
    public void ToggleSection_ExpandsSection_WhenCollapsed()
    {
        // Arrange
        var service = new MobileMenuService();

        // Act
        service.ToggleSection(ExpandedSection.Categories);

        // Assert
        Assert.Equal(ExpandedSection.Categories, service.ExpandedSection);
    }

    [Fact]
    public void ToggleSection_CollapsesSection_WhenExpanded()
    {
        // Arrange
        var service = new MobileMenuService();
        service.ToggleSection(ExpandedSection.Categories);

        // Act
        service.ToggleSection(ExpandedSection.Categories);

        // Assert
        Assert.Equal(ExpandedSection.None, service.ExpandedSection);
    }

    [Fact]
    public void Reset_ResetsAllState()
    {
        // Arrange
        var service = new MobileMenuService();
        service.NavigateToShop();
        service.ToggleSection(ExpandedSection.BodyPart);

        // Act
        service.Reset();

        // Assert
        Assert.Equal(MenuLevel.Main, service.MenuLevel);
        Assert.Equal(ExpandedSection.None, service.ExpandedSection);
    }
}
```

### Integration Testing

```csharp
// MobileMenuTests.cs
using Bunit;
using Xunit;

public class MobileMenuTests : TestContext
{
    [Fact]
    public void MobileMenu_RendersCorrectly_WhenOpen()
    {
        // Arrange
        Services.AddSingleton<MobileMenuConfig>();
        Services.AddScoped<MobileMenuService>();

        // Act
        var cut = RenderComponent<MobileMenu>(parameters => parameters
            .Add(p => p.IsOpen, true)
        );

        // Assert
        cut.Find("[data-name='mobile menu overlay']").Should().NotBeNull();
    }

    [Fact]
    public void MobileMenu_CallsOnClose_WhenCloseButtonClicked()
    {
        // Arrange
        var closeCalled = false;
        var cut = RenderComponent<MobileMenu>(parameters => parameters
            .Add(p => p.IsOpen, true)
            .Add(p => p.OnClose, EventCallback.Factory.Create(this, () => closeCalled = true))
        );

        // Act
        cut.Find("button[aria-label='Close menu']").Click();

        // Assert
        Assert.True(closeCalled);
    }
}
```

---

## Performance Considerations

### Optimization Checklist

- [ ] **Use CSS animations instead of JavaScript**
  - Lower CPU usage
  - Hardware-accelerated
  - Smoother on mobile

- [ ] **Minimize re-renders**
  - Use `ShouldRender()` strategically
  - Avoid unnecessary StateHasChanged() calls

- [ ] **Lazy load shop sections**
  - Only render expanded section content
  - Use `@if` to conditionally render

- [ ] **Virtual scrolling for long lists**
  - If section items exceed 50+
  - Consider Blazor Virtualize component

- [ ] **Optimize JavaScript interop**
  - Batch calls when possible
  - Cache IJSRuntime reference

---

## Common Pitfalls

### Issue: Animations not working

**Solution:** Ensure CSS file is included in `_Host.cshtml` or `App.razor`:

```html
<link href="css/mobile-menu-animations.css" rel="stylesheet" />
```

### Issue: State not updating

**Solution:** Subscribe to service events and call `StateHasChanged()`:

```csharp
MenuService.OnStateChanged += StateHasChanged;
```

### Issue: Scroll lock not working on iOS

**Solution:** Verify JavaScript interop is called in `OnAfterRenderAsync`:

```csharp
protected override async Task OnAfterRenderAsync(bool firstRender)
{
    await JS.InvokeVoidAsync("mobileMenu.lockScroll");
}
```

---

## Migration Checklist

### Pre-Migration
- [ ] Review React implementation thoroughly
- [ ] Understand state flow and data structure
- [ ] Set up Blazor project with Tailwind CSS
- [ ] Include mobile-menu.js in project

### Phase 1: Data Layer
- [ ] Create MobileMenuModels.cs
- [ ] Create MobileMenuConfig.cs
- [ ] Register services in Program.cs
- [ ] Verify configuration loads correctly

### Phase 2: State Management
- [ ] Create MobileMenuService.cs
- [ ] Implement state properties and methods
- [ ] Add state change notification
- [ ] Write unit tests for service

### Phase 3: JavaScript Interop
- [ ] Create mobile-menu.js
- [ ] Implement lockScroll()
- [ ] Implement unlockScroll()
- [ ] Test on iOS Safari

### Phase 4: Icon Components
- [ ] Create CloseIcon.razor
- [ ] Create ChevronRightIcon.razor
- [ ] Create AddIcon.razor
- [ ] Create MinusIcon.razor
- [ ] Create MobileMenuLogo.razor

### Phase 5: Subcomponents
- [ ] Create MobileMenuHeader.razor
- [ ] Create MobileMenuMain.razor
- [ ] Create MobileMenuShop.razor
- [ ] Create MobileMenuButtons.razor
- [ ] Create ExpandableSection.razor

### Phase 6: Main Component
- [ ] Create MobileMenu.razor
- [ ] Implement parameter bindings
- [ ] Add event handlers
- [ ] Test all user interactions

### Phase 7: CSS Animations
- [ ] Create mobile-menu-animations.css
- [ ] Implement backdrop fade
- [ ] Implement panel slide
- [ ] Implement header transitions
- [ ] Implement menu item stagger
- [ ] Implement section expand/collapse
- [ ] Implement button animations

### Phase 8: Testing
- [ ] Unit test MobileMenuService
- [ ] Integration test all components
- [ ] Manual test on desktop
- [ ] Manual test on tablet
- [ ] Manual test on mobile
- [ ] Test on iOS Safari
- [ ] Test on Android Chrome
- [ ] Accessibility testing

### Phase 9: Polish
- [ ] Performance optimization
- [ ] Code review
- [ ] Documentation updates
- [ ] Deploy to staging

---

## Support Resources

- **React Reference:** `/components/MobileMenu.tsx`
- **Data Reference:** `/data/mobileMenuData.ts`
- **Hook Reference:** `/hooks/useMobileMenu.ts`
- **Full Documentation:** `/docs/mobile-menu-documentation.md`
- **Quick Reference:** `/docs/mobile-menu-quick-reference.md`

---

**Last Updated:** December 8, 2024  
**Status:** Ready for Migration  
**Estimated Completion:** 2-3 weeks
