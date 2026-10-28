import { BusinessSettings } from '../models/BusinessSettings.js';

export const getPublicSettings = async (req, res, next) => {
  try {
    let settings = await BusinessSettings.findOne();
    if (!settings) {
      settings = await BusinessSettings.create({});
    }

    // Expose only public safe fields
    const publicData = {
      businessName: settings.businessName,
      tagline: settings.tagline,
      contactPhone: settings.contactPhone,
      whatsappPhone: settings.whatsappPhone,
      email: settings.email,
      address: settings.address,
      city: settings.city,
      serviceAreas: settings.serviceAreas,
      businessHours: settings.businessHours,
      minimumOrderAmount: settings.minimumOrderAmount,
      deliveryFee: settings.deliveryFee,
      freeDeliveryThreshold: settings.freeDeliveryThreshold,
      advanceBookingHours: settings.advanceBookingHours,
      orderTimeSlots: settings.orderTimeSlots,
      isStoreOpen: settings.isStoreOpen,
      closureNotice: settings.closureNotice,
      currencySymbol: settings.currencySymbol,
    };

    res.json({
      success: true,
      settings: publicData,
    });
  } catch (error) {
    next(error);
  }
};

export const getAdminSettings = async (req, res, next) => {
  try {
    let settings = await BusinessSettings.findOne();
    if (!settings) {
      settings = await BusinessSettings.create({});
    }

    res.json({
      success: true,
      settings,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSettings = async (req, res, next) => {
  try {
    let settings = await BusinessSettings.findOne();
    if (!settings) {
      settings = await BusinessSettings.create(req.body);
    } else {
      settings = await BusinessSettings.findByIdAndUpdate(settings._id, req.body, {
        new: true,
        runValidators: true,
      });
    }

    res.json({
      success: true,
      message: 'Business settings updated successfully.',
      settings,
    });
  } catch (error) {
    next(error);
  }
};
